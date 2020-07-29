<template>
  <a-layout>
    <a-layout>
      <ChatNavbar />
      <a-layout>
        <RoomList />
              <a-layout :style="{ marginLeft: '200px'}">
        <a-layout-header>Header</a-layout-header>
        <a-layout-content>
          <MessageList />
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
      </a-layout>
    </a-layout>
    <MemberList />
  </a-layout>
</template>

<script type="ts" lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ChatNavbar from '~/components/ChatNavbar.vue'
import RoomList from '~/components/RoomList.vue'
import MessageList from '~/components/MessageList.vue'
import MemberList from '~/components/MemberList.vue'
@Component({
  components: {
    ChatNavbar,
    RoomList,
    MessageList,
    MemberList
  }
})
export default class login extends Vue { }
</script>
