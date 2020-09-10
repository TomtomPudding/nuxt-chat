<template>
  <a-layout-header class="header">
    <div class="logo ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-5 ant-col-xl-5 ant-col-xxl-4 header-left">
      Chat App
    </div>

    <a-popover placement="bottom" trigger="click">
      <template slot="content">
        <div class="ant-card-meta-detail card-meta">
          <div class="ant-card-meta-title" style="margin-bottom: 0px;">{{user.name}}</div>
          <div class="ant-card-meta-description">{{user.email}}</div>
        </div>
        <div class="card-main">
          <a-row class="row">
            <a-col :span="5" class="row-title">
              UserId
            </a-col>
            <a-col :span="19">
              {{user.uid}}
            </a-col>
          </a-row>
        </div>
        <div style="text-align: center; padding-top: 20px;" @click="logout">
          <a-button type="danger" icon="logout" html-type="submit" :loading="isLoading">Log Out</a-button>
        </div>
      </template>
      <template slot="title">
        <img
          slot="cover"
          :src="user.photoURL"
          width="250" height="250"
        />
      </template>
      <a-button shape="circle">
        <a-avatar style="color: #f56a00; backgroundColor: #fde3cf" :src="user.photoURL" />
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

  async logout() {
    await auth.signOut().catch(console.log);
    this.$router.push("/")
  }
}
</script>
<style lang="scss">
.header {
  background-color: #001529;
  color: #e8e8e8;
  border-bottom: 1px solid #666666;
  position: relative;
  max-width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    font-size: 18px;
  }
}

.card-meta {
  text-align: center;
}

.card-main {
  padding-top: 5px;
  padding-bottom: 5px;

  .row {
    padding: 2px;
    border-top: solid;
    border-bottom:solid;
    border-color:#f3f3f3;
    border-width: 1px;

    .row-title {
      color: #666666;
    }
  }
}


</style>
