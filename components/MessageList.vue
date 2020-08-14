<template>
  <div class="message-area">
    <div
      class="message-list"
    >
      <a-list :grid="{ gutter: 0}" :data-source="data">
        <a-list-item  style="margin-bottom: 0" slot="renderItem" slot-scope="item, index">

          <div class="background-line">
            <div v-if="item.id == userId">
              <UserMessageBox :text="item.text" style="z-index: 10;background-color: inherit;" />
            </div>
            <div v-else>
              <MemberMessageBox :text="item.text" style="z-index: 10;background-color: inherit;" :style="item.space" />
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
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from 'nuxt-property-decorator'
import MemberMessageBox from '~/components/MemberMessageBox.vue'
import UserMessageBox from '~/components/UserMessageBox.vue'
import {ChatLayout} from '@/interfaces/Chat'

// 背景用
var beforeLine =  [{"clip-path":""}];
// directionは相手側の連続発言回数 最大3まで
var bottomPoint = {"rightX": 0.0, "leftX" : 0.0, "reply": {"direction": true, "id": "", "count": 0}};
var userPoint = {"rightX": 0.0, "leftX" : 0.0, "direction": true};
interface MyIterface {
    name?:string
}

@Component({
  components: {
    MemberMessageBox,
    UserMessageBox
  }
})
export default class MessageList extends Vue {
  data:ChatLayout[] = [];
  loading = false;
  busy =  false;
  userId = "001";
  lastUserId = "";

  beforeMount() {
    this.fetchData((res:any):any => {
      this.data = res.results;
    });
  }

  created() {
    // ここでデータを取得更新
    const initData = [
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト１", "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト2", "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト3", "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト4", "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト5", "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト6", "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト7", "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト8", "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト9", "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト１0", "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト１1", "line": null, "space": null},
      {"id": "003", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト１2", "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト１3", "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト１4", "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト１5", "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト１6", "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト１7", "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト１8", "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト１9", "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "text": "テスト20", "line": null, "space": null}];
    this.data = initData
    if(this.data.length <= 0) return;
    // UI背景css 作成
    this.emptyUser();


    const data = this.data;
    this.initPosition(data[0]);
    // 背景情報格納
    data.slice(1).forEach((item, index) =>{
      if((this.lastUserId != this.userId) && (item.id == this.userId)) {
        this.drawRightLine();
      } else if((this.lastUserId == this.userId) && (item.id != this.userId)) {
        this.drawLeftLine();
      } else {
        if(this.userId == this.lastUserId) {
          this.drawUserLine();
        } else {
          this.drawMemberLine();
        }
      }
    });
  }

  fetchData(callback:any) {
      // reqwest({
      //   url: fakeDataUrl,
      //   type: 'json',
      //   method: 'get',
      //   contentType: 'application/json',
      //   success: res => {
      //     callback(res);
      //   },
      // });
  }

  handleInfiniteOnLoad() {
      // const data = this.data;
      // this.loading = true;
      // if (data.length > 14) {
      //   this.$message.warning('Infinite List loaded all');
      //   this.busy = true;
      //   this.loading = false;
      //   return;
      // }
      // this.fetchData(res => {
      //   this.data = data.concat(res.results);
      //   this.loading = false;
      // });
  }

  private emptyUser() {
    if(this.lastUserId == "") {
      this.lastUserId = this.data[beforeLine.length-1].id
      beforeLine = [{"clip-path":""}];
    }
    return
  }

  // 以下のメソッドは背景生成処理
  private initPosition(data: ChatLayout) {
    this.lastUserId = data.id
    if(this.userId == data.id) {
      userPoint = {"rightX": 90, "leftX" : 85, "direction": true}
    } else {
      bottomPoint = {"rightX": 16, "leftX" : 9, "reply": {"id": data.id, "count": 0, "direction": true}}
    }
  }


  // 相手から自分のメッセージに移動するとき
  private drawRightLine() {
    const leftX = bottomPoint.leftX
    const rightX = bottomPoint.rightX

    beforeLine[beforeLine.length-1]["clip-path"] = "polygon("+leftX+"% 0, "+rightX+"% 0%, 90% 100%, 80% 100%)"
    userPoint = {"rightX": 90, "leftX" : 80, "direction": true}

    this.afterDraw();
  }

  // 自分から相手のメッセージに移動するとき
  private drawLeftLine() {
    const leftX = userPoint.leftX
    const rightX = userPoint.rightX
    var reply = bottomPoint.reply

    reply = {"count": 0, "direction": true, "id": this.data[beforeLine.length].id}

    beforeLine[beforeLine.length-1]["clip-path"] = "polygon("+leftX+"% 0, "+rightX+"% 0%, 12% 100%, 5% 100%)"
    bottomPoint = {"rightX": 12.0, "leftX" : 5.0, "reply": reply}

    this.data[beforeLine.length].space = {"margin-left": "0px", "margin-top": "30px"};
    this.afterDraw();
  }

  // 連続したユーザのメッセージ
  private drawUserLine() {
    const leftX = userPoint.leftX
    const rightX = userPoint.rightX
    const len = this.getLineLen();
    const width =this.getLineWidth();

    // 線の向きを決める
    if(userPoint.direction) {
      beforeLine[beforeLine.length-1]["clip-path"]
        = "polygon("+leftX+"% 0, "+rightX+"% 0%,"+(rightX-width+len)+"% 100%, "+(rightX-width)+"% 100%)"
      userPoint = {"rightX": (rightX-width+len), "leftX" : (rightX-width), "direction": !userPoint.direction}
    } else {
      beforeLine[beforeLine.length-1]["clip-path"]
        = "polygon("+leftX+"% 0, "+rightX+"% 0%,"+(leftX+width+len)+"% 100%, "+(leftX+width)+"% 100%)"
      userPoint = {"rightX": (leftX+width+len), "leftX" : (leftX+width), "direction": !userPoint.direction}
    }

    this.afterDraw();
  }

  // 連続したメンバーのメッセージ
  private drawMemberLine() {
    const leftX = bottomPoint.leftX
    const rightX = bottomPoint.rightX
    var reply = bottomPoint.reply

    if(reply.id == this.data[beforeLine.length].id) {
      const len = this.getLineLen();
      const width = this.getLineWidth();

      if(reply.count < 3) {
        reply.count = reply.count + 1;
      } else {
        reply.count = reply.count - 1;
      }
      this.data[beforeLine.length].space = {"margin-left": 20*reply.count + "px", "margin-top": "0px"};
      if(reply.direction) {
        beforeLine[beforeLine.length-1]["clip-path"]
          = "polygon("+leftX+"% 0, "+rightX+"% 0%, "+(rightX+width+len)+"% 100%, "+(rightX+width)+"% 100%)"
        reply.direction = !reply.direction

        bottomPoint = {"rightX": (rightX+width+len), "leftX" : (rightX+width), "reply": reply}
      }else {
        beforeLine[beforeLine.length-1]["clip-path"]
          = "polygon("+leftX+"% 0, "+rightX+"% 0%, "+(leftX-width+len)+"% 100%, "+(leftX-width)+"% 100%)"
        reply.direction = !reply.direction
        bottomPoint = {"rightX": (leftX-width+len), "leftX" : (leftX-width), "reply": reply}
      }
    } else {
      reply = {"count": 0, "direction": true, "id": this.data[beforeLine.length].id}
      this.data[beforeLine.length].space = {"margin-left": 20*reply.count + "px", "margin-top": "0px"};
      beforeLine[beforeLine.length-1]["clip-path"] = "polygon("+leftX+"% 0, "+rightX+"% 0%, 16% 100%, 9% 100%)"
      bottomPoint = {"rightX": 16, "leftX" : 9, "reply": reply}
    }
    this.afterDraw();
  }

  private afterDraw() {
    this.lastUserId = this.data[beforeLine.length].id
    this.data[beforeLine.length].line = beforeLine[beforeLine.length-1];

    beforeLine.push({"clip-path":""})
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
    max-width: 480px;
    padding: 8px 24px;
    background-color: #d50000;
    overflow: auto;
    height: 86vh;

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
