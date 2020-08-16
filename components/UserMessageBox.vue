<template>
  <div class="my-message-window">
    <div class="message-area">
      <div class="content">
        <div>
          <div style="arrow-area">
            <div class="arrow-black"></div>
            <div class="background-black"></div>
            <div class="background-white"></div>
            <div class="arrow-white"></div>
            <div class="text-area" v-html="text"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class UserMesssageBox extends Vue {
  @Prop({ type: String, required: true })
  text: string;
}
</script>

<style lang="scss">

.my-message-window {
  max-width: 400px;
  margin: 2px 0px 2px auto;
  position: relative;
  background: #00000000;
  display: flex;
  justify-content: flex-end;

  .message-area {
    font-weight: 700;
    justify-content: flex-end;

    > .content {
      margin-right: -21px;
      transform: rotate(-4.0deg);

      .arrow-black {
        position: absolute;
        right: 0;
        background-color: #000;
        width: 35px;
        height: 25px;
        transform: translate(0%, -45%);
        top: calc(45% - 2px);
        clip-path: polygon(38% 43%, 0% 17%, 0% 100%, 66% 100%, 70% 65%, 100% 71%, 45% 8%);
      }

      .arrow-white {
        background-color: #fff;
        position: absolute;
        right: 0;
        transform: rotate(90deg);
        vertical-align: middle;
        width: 35px;
        height: 20px;
        transform: translate(0%, -45%);
        top: calc(45% - 2px);
        clip-path: polygon(43% 57%, 0% 28%, 0% 100%, 60% 91%, 63% 54%, 85% 61%, 49% 17%);
      }

      .background-black {
        position: absolute;
        right: 0;
        background-color: #000;
        width: 100%;
        height: 100%;
        margin-right: 15px;

        clip-path: polygon(100% 87%, 7% 100%, 0 0, 94% 7%);
      }

      .background-white {
        background-color: #fff;
        position: absolute;
        right: 0;
        vertical-align: middle;
        width: calc(100% - 16px);
        height: calc(100% - 10px);
        margin-right: 20px;
        margin-top: 4.5px;
        margin-bottom: 7px;

        clip-path: polygon(100% 87%, 5% 100%, 0 0, 94% 7%);
      }
      .arrow-area {
        display: inline-block;
        vertical-align: middle;
      }
      .text-area {
        position: relative;
        right: 0;
        width: 100%;
        display: inline-block;
        vertical-align: middle;
        color: #000;
        font-size: 12px;
        margin-top: 5px;
        margin-bottom: 7px;
        padding-right: 50px;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        line-height: 1.2em;

        overflow-wrap: break-word;
      }
    }
  }
}
</style>
