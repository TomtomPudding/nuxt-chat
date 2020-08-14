<template>
  <div class="member-message-window">
    <div class="message-area">
      <div class="avatar">
        <div class="avatar-inner">
          <div class="avatar-image">
            <img src="https://avatars0.githubusercontent.com/u/49276351?s=200&u=9b6762442a5d06cfc3b6890cbcac02ab23584b09&v=4" width="60" height="60">
          </div>
        </div>
      </div>
      <div class="content">
        <div>
          <div style="arrow-area">
            <div class="arrow-white"></div>
            <div class="background-white"></div>
            <div class="background-black"></div>
            <div class="arrow-black"></div>
            <div class="reaction">？</div>
            <div class="text-area">
              <div>来てくれるかなモルモット君？</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss">

.member-message-window {
  max-width: 400px;
  position: relative;
  background: #00000000;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .message-area {
    // position: absolute;
    left: 20px;
    font-weight: 700;

      .avatar {
        display: inline-block;
        vertical-align: middle;
        transform: translate(0, 20%);
        width: 60px;
        height: 60px;

        background-color: #000;
        clip-path: polygon(0 0, 95% 5%, 100% 85.5%, 10% 100%);
        .avatar-inner {
          background-color: #fff;
              clip-path: polygon(12% 12%, 93% 13%, 98% 81%, 17% 93%);
          .avatar-image{
              clip-path: polygon(17% 17%, 88% 18%, 93% 76%, 22% 88%);
          }
        }
      }

    > .content {
      margin-left: -21px;
      display: inline-block;
      transform: rotate(-5.0deg);
      width: calc(100% - 45px);

      .arrow-white {
        position: absolute;
        background-color: #fff;
        width: 35px;
        height: 25px;
        transform: translate(0%, -45%);
        top: calc(45% - 2px);
        clip-path: polygon(62% 43%, 100% 17%, 100% 73%, 50% 100%, 44% 56%, 0 71%, 55% 8%);
      }

      .arrow-black {
        background-color: #000;
        position: absolute;
        vertical-align: middle;
        width: 35px;
        height: 20px;
        transform: translate(0%, -45%);
        top: calc(45% - 2px);
        clip-path: polygon(62% 43%, 100% 26%, 100% 73%, 53% 95%, 44% 56%, 0 71%, 56% 19%);
      }

      .background-white {
        position: absolute;
        background-color: #fff;
        width: 100%;
        height: 100%;
        margin-left: 15px;
        margin-right: 0px;
        clip-path: polygon(6% 3%, 100% 0, 90% 100%, 0 87%);
      }

      .background-black {
        background-color: #000;
        position: absolute;
        vertical-align: middle;
        width: calc(100% - 16px);
        height: calc(100% - 10px);
        margin-left: 19px;
        margin-right: 20px;
        margin-top: 4px;
        margin-bottom: 7px;
        clip-path: polygon(6% 7%, 100% 0, 94% 100%, 0 87%);
      }
      .arrow-area {
        display: inline-block;
        vertical-align: middle;
      }
      .text-area {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        font-size: 12px;
        width: 100%;
        margin-left: 50px;
        margin-top: 5px;
        margin-bottom: 7px;
        padding-right: 40px;
        padding-top: 10px;
        padding-bottom: 10px;
        line-height: 1.2em;

        overflow-wrap: break-word;
      }
      .reaction {
        position: absolute;
        font-weight: 1000;
        font-size: 24px;
        right: 5px;
        top: -15px;
        transform: rotate(20deg);
        text-shadow:1px 1px 0 #fff,-1px 1px 0 #fff,1px -1px 0 #fff,-1px -1px 0 #fff;
      }
    }
  }
}
</style>
