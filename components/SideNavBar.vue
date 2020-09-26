<template>
    <a-layout-sider theme="dark"  :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }" class="left-bar">
        <a-menu
        theme="dark"
        :defaultSelectedKeys="['1']"
        :default-open-keys="['team', 'friend']"
        mode="inline">
            <a-sub-menu key="option">
              <span slot="title"><a-icon type="bell" /><span>Option</span></span>
              <a-menu-item key="usergroup-add"><a-icon type="usergroup-add" />New Team
                <nuxt-link to="/create-room"></nuxt-link>
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="team" :reverseArrow="true">
              <span slot="title"><a-icon type="home" /><span>Room</span></span>
              <template v-for="(room) in rooms">
                <a-menu-item :key="room.id" >
                  <nuxt-link :to="`/room/${room.id}`">{{room.name}}
                  </nuxt-link>
                </a-menu-item>
              </template>
            </a-sub-menu>
            <a-sub-menu key="friend">
              <span slot="title"><a-icon type="user" /><span>Friend</span></span>
              <a-menu-item key="3">Tom</a-menu-item>
              <a-menu-item key="4">Bill</a-menu-item>
              <a-menu-item key="5">Alex</a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>
<script type="ts" lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { auth } from '@/store/auth'

@Component
export default class RoomFormComponent extends Vue {

  get rooms() {
    return auth.rooms
  }

  beforeCreate() {
    auth.listRoom()
  }

}
</script>
<style>
.left-bar {
  border-right: 1px solid #666666;
}
</style>
