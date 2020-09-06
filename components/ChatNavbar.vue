<template>
  <a-layout-header class="header">
    <div class="logo ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-5 ant-col-xl-5 ant-col-xxl-4 header-left">
      Chat App
    </div>

    <a-popover placement="bottom" trigger="click">
      <template slot="content">
        <div style="text-align: center" @click="logout">
          <a-button type="danger" icon="logout" html-type="submit" :loading="isLoading">Log Out</a-button>
        </div>
      </template>
      <template slot="title">
        <span>トム</span>
      </template>
      <a-button shape="circle">
        <a-avatar style="color: #f56a00; backgroundColor: #fde3cf" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </a-button>
    </a-popover>
  </a-layout-header>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { auth } from '@/store/auth'

@Component
export default class LoginFormComponent extends Vue {
  form: any;
  isLoading: boolean = false;

  async logout() {
    await auth.signOut().catch(console.log);
    this.$router.push("/")
  }
}
</script>
<style>
.header {
  background-color: #001529;
  color: #e8e8e8;
  border-bottom: 1px solid #666666;
  position: relative;
  max-width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .logo {
  font-size: 18px;
}
</style>
