<template>
  <a-layout>
    <a-layout>
      <ChatNavbar />
      <a-layout>
        <SideNavBar />
        <a-layout :style="{ marginLeft: '200px'}">
          <a-layout-header class="header-message">
            Room Title
          </a-layout-header>
          <a-layout-content>
            <MessageList />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
    <!-- サイトバー -->
    <!-- <MemberList /> -->
  </a-layout>
</template>

<script type="ts" lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ChatNavbar from '~/components/ChatNavbar.vue'
import SideNavBar from '~/components/SideNavBar.vue'
import MessageList from '~/components/MessageList.vue'
import MemberList from '~/components/MemberList.vue'
@Component({
  components: {
    ChatNavbar,
    SideNavBar,
    MessageList,
    MemberList
  }
})
export default class chat extends Vue { }
</script>
<style>
.header-message {
  background-color: #001529;
  color: #e8e8e8;
  font-size: 18px;
  max-width: 100%;
  padding-right: 24px;
  padding-left: 24px;
}
</style>
