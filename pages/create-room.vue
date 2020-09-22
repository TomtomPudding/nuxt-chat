<template>
  <a-layout>
    <a-layout>
      <ChatNavbar />
      <a-layout>
        <SideNavBar />
        <a-layout :style="{ marginLeft: '200px'}">
          <a-layout-header class="header-message">
            ルーム作成
          </a-layout-header>
          <a-layout-content class="room-content">
            <RoomForm />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template><script type="ts" lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ChatNavbar from '~/components/ChatNavbar.vue'
import SideNavBar from '~/components/SideNavBar.vue'
import RoomForm from '~/components/RoomForm.vue'
@Component({
  components: {
    ChatNavbar,
    SideNavBar,
    RoomForm
  }
})
export default class login extends Vue { }
</script>
<style lang="scss">
.header-message {
  background-color: #001529;
  color: #e8e8e8;
  font-size: 18px;
  max-width: 100%;
  padding-right: 24px;
  padding-left: 24px;
}

.room-content {
  padding-top: 20px;
  overflow-y: scroll;
  height: 86.3vh;
}
</style>
