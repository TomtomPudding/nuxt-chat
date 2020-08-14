<template>
  <div class="message-area">
    <div
      class="message-list"
    >
      <a-list :grid="{ gutter: 0}" :data-source="data">
        <a-list-item  style="margin-bottom: 0" slot="renderItem" slot-scope="item, index">

          <div class="background-line">
            <div v-if="item.id == userId">
              <MyMessageBox style="z-index: 10;background-color: inherit;" />
            </div>
            <div v-else>
              <MessageBox style="z-index: 10;background-color: inherit;" :style="item.space" />
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
import MessageBox from '~/components/MessageBox.vue'
import MyMessageBox from '~/components/MyMessageBox.vue'

// 背景用
var beforeLine =  [{"clip-path":""}];
// directionは相手側の連続発言回数 最大５まで
var bottomPoint = {"rightX": 0.0, "leftX" : 0.0, "reply": {"direction": true, "id": "", "count": 0}};
var userPoint = {"rightX": 0.0, "leftX" : 0.0, "direction": true};

@Component({
  components: {
    MessageBox,
    MyMessageBox
  }
})
export default class messageList extends Vue {
  data = [
    {"id": "", "email":"", "name": {"last":""},
    "line": {"clip-path":""},
    "space": {"margin-left": "0%", "margin-top": "0px"}},
    {"id": "", "email":"", "name": {"last":""}, "line": null, "space": null}];
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
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "003", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "002", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null},
      {"id": "001", "email":"a.com", "name": {"last":"Tom"}, "line": null, "space": null}];
    this.data = initData
    if(this.data.length <= 0) return;
    // UI背景css 作成
    this.emptyUser();


    const data = this.data;
    // 背景情報格納
    data.slice(1).forEach((item, index) =>{
      if((this.lastUserId != this.userId) && (item.id == this.userId)) {
        this.drawRightLine();
      } else if((this.lastUserId == this.userId) && (item.id != this.userId)) {
        this.drawLeftLine();
      } else {
        this.drawNotUserLine();
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
  private drawRightLine() {
    const leftX = bottomPoint.leftX
    const rightX = bottomPoint.rightX

    if(beforeLine.length <= 1) {
      beforeLine[beforeLine.length-1]["clip-path"] = "polygon(0% 0, 10% 0%, 90% 100%, 80% 100%)"
      userPoint = {"rightX": 95, "leftX" : 85, "direction": true}
    } else {
      beforeLine[beforeLine.length-1]["clip-path"] = "polygon("+leftX+"% 0, "+rightX+"% 0%, 90% 100%, 80% 100%)"
      userPoint = {"rightX": 95, "leftX" : 85, "direction": true}
    }
    this.lastUserId = this.data[beforeLine.length].id
    this.data[beforeLine.length].line = beforeLine[beforeLine.length-1];

    beforeLine.push({"clip-path":""});
  }

  private drawLeftLine() {
    const leftX = userPoint.leftX
    const rightX = userPoint.rightX
    const reply = bottomPoint.reply

    reply.count = 0;
    reply.direction = true;
    reply.id = this.data[beforeLine.length].id;

    if(beforeLine.length <= 1) {
      beforeLine[beforeLine.length-1]["clip-path"] = "polygon(88% 0, 95% 0%, 16% 100%, 9% 100%)"
      bottomPoint = {"rightX": 16.0, "leftX" : 9, "reply": reply}
      this.data[beforeLine.length].space = {"margin-left": "0px", "margin-top": "30px"};
    } else {
      const reply = bottomPoint.reply
      beforeLine[beforeLine.length-1]["clip-path"] = "polygon("+leftX+"% 0, "+rightX+"% 0%, 12% 100%, 5% 100%)"
      bottomPoint = {"rightX": 7.0, "leftX" : 0, "reply": reply}
      this.data[beforeLine.length].space = {"margin-left": "0px", "margin-top": "30px"};
    }
    this.lastUserId = this.data[beforeLine.length].id
    this.data[beforeLine.length].line = beforeLine[beforeLine.length-1];

    beforeLine.push({"clip-path":""});
  }

  private drawNotUserLine() {
    if(beforeLine.length <= 1) {
      if(this.userId == this.lastUserId) {
        beforeLine[beforeLine.length-1]["clip-path"] = "polygon(95% 0, 100% 0%,67% 100%, 60% 100%)"
        userPoint = {"rightX": 67, "leftX" : 60, "direction": false}
      } else {
        const reply = bottomPoint.reply
        reply.count = reply.count + 1;
        beforeLine[beforeLine.length-1]["clip-path"] = "polygon(4% 0, 9% 0%, 16% 100%, 9% 100%)"
        bottomPoint = {"rightX": 16, "leftX" : 9, "reply": reply}
        this.data[beforeLine.length].space = {"margin-left": 20 + "px", "margin-top": "0px"};
      }
    } else {
      if(this.userId == this.lastUserId) {
        const leftX = userPoint.leftX
        const rightX = userPoint.rightX
        const len = this.getLineLen();
        const width =this.getLineWidth();

        if(userPoint.direction) {
          beforeLine[beforeLine.length-1]["clip-path"]
            = "polygon("+leftX+"% 0, "+rightX+"% 0%,"+(rightX-width+len)+"% 100%, "+(rightX-width)+"% 100%)"
          userPoint = {"rightX": (rightX-width+len), "leftX" : (rightX-width), "direction": !userPoint.direction}
        } else {
          beforeLine[beforeLine.length-1]["clip-path"]
            = "polygon("+leftX+"% 0, "+rightX+"% 0%,"+(leftX+width+len)+"% 100%, "+(leftX+width)+"% 100%)"
          userPoint = {"rightX": (leftX+width+len), "leftX" : (leftX+width), "direction": !userPoint.direction}
        }
      } else {
        const leftX = bottomPoint.leftX
        const rightX = bottomPoint.rightX
        const reply = bottomPoint.reply

        if(reply.id == this.data[beforeLine.length].id) {
          const len = this.getLineLen();
          const width = this.getLineWidth();

          if(reply.count < 3) {
            reply.count = reply.count + 1;
          } else {
            reply.count = reply.count - 1;
          }
          this.data[beforeLine.length].space = {"margin-left": 20*reply.count + "px", "margin-top": "0px"};

          if(userPoint.direction) {
            beforeLine[beforeLine.length-1]["clip-path"]
              = "polygon("+leftX+"% 0, "+rightX+"% 0%, "+(width+len-leftX)+"% 100%, "+(width-leftX)+"% 100%)"
            bottomPoint = {"rightX": (width+len-leftX), "leftX" : (width-leftX), "reply": reply}
          }else {
            beforeLine[beforeLine.length-1]["clip-path"]
              = "polygon("+leftX+"% 0, "+rightX+"% 0%, "+(width+len-rightX)+"% 100%, "+(width-rightX)+"% 100%)"
            bottomPoint = {"rightX": (width+len-rightX), "leftX" : (width-rightX), "reply": reply}
          }
          reply.direction = !reply.direction
        } else {
          reply.count = 0;
          reply.direction = true;
          reply.id = this.data[beforeLine.length].id;
          this.data[beforeLine.length].space = {"margin-left": 20*reply.count + "px", "margin-top": "0px"};
          beforeLine[beforeLine.length-1]["clip-path"] = "polygon("+leftX+"% 0, "+rightX+"% 0%, 12% 100%, 7% 100%)"
          bottomPoint = {"rightX": 12, "leftX" : 7, "reply": reply}
        }
      }
    }
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
