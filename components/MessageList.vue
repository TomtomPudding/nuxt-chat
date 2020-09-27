<template>
  <div class="message-area">
    <div
      class="message-list"
    >
      <div class="message-box" ref="message">
        <a-list :grid="{ gutter: 0}" :data-source="data">
          <a-list-item  style="margin-bottom: 0" slot="renderItem" slot-scope="item, index">

            <div class="background-line">
              <div v-if="item.id == ''">
              </div>
              <div v-else-if="item.id == user.uid">
                <UserMessageBox :text="item.text" style="z-index: 10;background-color: inherit;" />
              </div>
              <div v-else>
                <MemberMessageBox :text="item.text" :photoURL="item.photoURL" style="z-index: 10;background-color: inherit;" :style="item.space" />
              </div>
              <div v-if="item.line" :style="item.line" class="line-shadow"></div>
              <div v-if="item.line" :style="item.line" class="line"></div>
            </div>
          </a-list-item>
          <div v-if="loading && !busy" class="demo-loading-container">
            <a-spin />
          </div>
        </a-list>
      </div>
      <MessageForm :name="user.name" :id="user.uid" :photoURL="user.photoURL" @addMessage="addMessage" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from 'nuxt-property-decorator'
import MemberMessageBox from '~/components/MemberMessageBox.vue'
import UserMessageBox from '~/components/UserMessageBox.vue'
import MessageForm from '~/components/MessageForm.vue'

import { Room } from '@/interfaces/Room';
import {Chat, ChatLayout} from '@/interfaces/Chat'
import { updateChatLog, roomDetail } from '@/plugins/firebase-store';
import { auth } from '@/store/auth';
import firebase from '@/plugins/firebase';

let db = firebase.firestore();

@Component({
  components: {
    MemberMessageBox,
    UserMessageBox,
    MessageForm
  }
})
export default class MessageList extends Vue {
  data:ChatLayout[] = [{ "id": "", "name": "", "text": "", "photoURL": "","line": null, "space": null }];
  loading = false;
  busy =  false;
  lastUserId = "";

  // 背景用
  beforeLine =  [{"clip-path":""}];
  // directionは相手側の連続発言回数 最大3まで
  bottomPoint = {"rightX": 0.0, "leftX" : 0.0, "reply": {"direction": true, "id": "", "count": 0}};
  userPoint = {"rightX": 0.0, "leftX" : 0.0, "direction": true};


  get user() {
    return auth.user || {
      "uid": "",
      "name": "unknown",
      "email": "",
      "photoURL": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      "friends": [],
      "rooms": []
    };
  }

  @Watch("data")
  onChangeData() {
    this.$nextTick(() => {
      const chatLog:Element = this.$refs.message as Element
      if (!chatLog) return
      chatLog.scrollTop = chatLog.scrollHeight
    });
  }


  async beforeCreate() {
    db.collection("rooms").doc(this.$route.params.id).onSnapshot(res => {
      const data = res.data() as Room
      if (this.lastUserId == "") this.data = [];
      const countDiff = data.chatLog.length - this.data.length
      if (countDiff < 0) return;
      var saveData: ChatLayout[] = data.chatLog.slice(this.data.length, data.chatLog.length).map(res => {
        return {
          "id": res.id,
          "name": res.name,
          "text": res.text,
          "photoURL": res.photoURL,
          "line": null,
          "space": null
        }
      })
      if (this.lastUserId == "") {
        this.data = saveData.length > 0 ? [saveData[0]] : [];
        if(this.data.length <= 0) {
          this.data.push({ "id": "", "name": "", "text": "", "photoURL": "","line": null, "space": null })
          return;
        }
        this.emptyUser();
        this.initPosition(saveData[0]);
        saveData = saveData.slice(1, data.chatLog.length)
      }

      if (saveData.length <= 0) return;
      this.data = this.data.concat(saveData)
      saveData.forEach((item, index) =>{
        if((this.lastUserId != this.user.uid) && (item.id == this.user.uid)) {
          this.drawRightLine();
        } else if((this.lastUserId == this.user.uid) && (item.id != this.user.uid)) {
          this.drawLeftLine();
        } else {
          if(this.user.uid == this.lastUserId) {
            this.drawUserLine();
          } else {
            this.drawMemberLine();
          }
        }
      });
    })
  }

  addMessage(message: Chat) {
    message.text = message.text.replace("\n","<br>");
    const data:ChatLayout =
      { "id": message.id, "name": message.name, "text": message.text, "photoURL": message.photoURL,"line": null, "space": null }

    this.data.push(data);

    if(this.lastUserId == "") {
      this.data.shift();
      updateChatLog(this.$route.params.id, this.data as Chat[])
      this.initPosition(data);
      return;
    }

    updateChatLog(this.$route.params.id, this.data as Chat[])
    if((this.lastUserId != this.user.uid) && (message.id == this.user.uid)) {
      this.drawRightLine();
    } else if((this.lastUserId == this.user.uid) && (message.id != this.user.uid)) {
      this.drawLeftLine();
    } else {
      if(this.user.uid == this.lastUserId) {
        this.drawUserLine();
      } else {
        this.drawMemberLine();
      }
    }
  }

  private emptyUser() {
    if(this.lastUserId == "") {
      this.lastUserId = this.data[this.beforeLine.length-1].id
      this.beforeLine = [{"clip-path":""}];
    }
    return
  }

  // 以下のメソッドは背景生成処理
  private initPosition(data: ChatLayout) {
    this.lastUserId = data.id
    if(this.user.uid == data.id) {
      this.userPoint = {"rightX": 90, "leftX" : 85, "direction": true}
    } else {
      this.bottomPoint = {"rightX": 16, "leftX" : 9, "reply": {"id": data.id, "count": 0, "direction": true}}
    }
  }


  // 相手から自分のメッセージに移動するとき
  private drawRightLine() {
    const leftX = this.bottomPoint.leftX
    const rightX = this.bottomPoint.rightX

    this.beforeLine[this.beforeLine.length-1]["clip-path"] = "polygon("+leftX+"% 0, "+rightX+"% 0%, 90% 100%, 80% 100%)"
    this.userPoint = {"rightX": 90, "leftX" : 80, "direction": true}

    this.afterDraw();
  }

  // 自分から相手のメッセージに移動するとき
  private drawLeftLine() {
    const leftX = this.userPoint.leftX
    const rightX = this.userPoint.rightX
    var reply = this.bottomPoint.reply

    reply = {"count": 0, "direction": true, "id": this.data[this.beforeLine.length].id}

    this.beforeLine[this.beforeLine.length-1]["clip-path"] = "polygon("+leftX+"% 0, "+rightX+"% 0%, 12% 100%, 5% 100%)"
    this.bottomPoint = {"rightX": 12.0, "leftX" : 5.0, "reply": reply}

    this.data[this.beforeLine.length].space = {"margin-left": "0px", "margin-top": "30px"};
    this.afterDraw();
  }

  // 連続したユーザのメッセージ
  private drawUserLine() {
    const leftX = this.userPoint.leftX
    const rightX = this.userPoint.rightX
    const len = this.getLineLen();
    const width =this.getLineWidth();

    // 線の向きを決める
    if(this.userPoint.direction) {
      this.beforeLine[this.beforeLine.length-1]["clip-path"]
        = "polygon("+leftX+"% 0, "+rightX+"% 0%,"+(rightX-width+len-1)+"% 100%, "+(rightX-width-1)+"% 100%)"
      this.userPoint = {"rightX": (rightX-width+len-1), "leftX" : (rightX-width-1), "direction": !this.userPoint.direction}
    } else {
      this.beforeLine[this.beforeLine.length-1]["clip-path"]
        = "polygon("+leftX+"% 0, "+rightX+"% 0%,"+(leftX+width+len-6)+"% 100%, "+(leftX+width-6)+"% 100%)"
      this.userPoint = {"rightX": (leftX+width+len-6), "leftX" : (leftX+width-6), "direction": !this.userPoint.direction}
    }

    this.afterDraw();
  }

  // 連続したメンバーのメッセージ
  private drawMemberLine() {
    const leftX = this.bottomPoint.leftX
    const rightX = this.bottomPoint.rightX
    var reply = this.bottomPoint.reply

    if(reply.id == this.data[this.beforeLine.length].id) {
      const len = this.getLineLen();
      const width = this.getLineWidth();

      if(reply.count < 3) {
        reply.count = reply.count + 1;
      } else {
        reply.count = reply.count - 1;
      }
      this.data[this.beforeLine.length].space = {"margin-left": 20*reply.count + "px", "margin-top": "0px"};
      if(reply.direction) {
        this.beforeLine[this.beforeLine.length-1]["clip-path"]
          = "polygon("+leftX+"% 0, "+rightX+"% 0%, "+(rightX+width+len)+"% 100%, "+(rightX+width)+"% 100%)"
        reply.direction = !reply.direction

        this.bottomPoint = {"rightX": (rightX+width+len), "leftX" : (rightX+width), "reply": reply}
      }else {
        this.beforeLine[this.beforeLine.length-1]["clip-path"]
          = "polygon("+leftX+"% 0, "+rightX+"% 0%, "+(leftX-width+len)+"% 100%, "+(leftX-width)+"% 100%)"
        reply.direction = !reply.direction
        this.bottomPoint = {"rightX": (leftX-width+len), "leftX" : (leftX-width), "reply": reply}
      }
    } else {
      reply = {"count": 0, "direction": true, "id": this.data[this.beforeLine.length].id}
      this.data[this.beforeLine.length].space = {"margin-left": 20*reply.count + "px", "margin-top": "0px"};
      this.beforeLine[this.beforeLine.length-1]["clip-path"] = "polygon("+leftX+"% 0, "+rightX+"% 0%, 16% 100%, 9% 100%)"
      this.bottomPoint = {"rightX": 16, "leftX" : 9, "reply": reply}
    }
    this.afterDraw();
  }

  private afterDraw() {
    this.lastUserId = this.data[this.beforeLine.length].id
    this.data[this.beforeLine.length].line = this.beforeLine[this.beforeLine.length-1];

    this.beforeLine.push({"clip-path":""})
  }

  // ランダムで線の太さを設定する
  private getLineLen():number {
    const lenBase = [6.5, 7.0, 7.5, 8.0, 8.5]
    return lenBase[Math.floor(Math.random()*5)];
  }

  private getLineWidth():number {
    const widthBase = [18.0, 18.5, 19.0, 19.5, 20.0, 20.5, 21.0, 21.5, 22.0]
    return widthBase[Math.floor(Math.random()*9)];
  }
}
</script>
<style lang="scss">
.message-area {
  background-color: #d5000055;
  .message-list {
    max-width: 520px;
    padding: 8px 24px;
    background-color: #d50000;
    max-height: 87.8vh;
    height: 87.8vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .message-box {
      overflow-y: auto;
      overflow-x: hidden;
      min-height: 80vh;
      max-height: 80vh;
      padding: 0px 20px;
    }

    .ant-list-grid .ant-col > .ant-list-item {
      margin-bottom: 0px;
    }

    .background-line {
      display: grid;

      .line {
        background-color: #000;
        position: absolute;
        width: 100%;
        top: -20px;
        height: 100%;
      }

      .line-shadow {
        background-color: #0005;
        position: absolute;
        width: 100%;
        top: -16px;
        height: 100%;
      }
    }
  }
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}
</style>
