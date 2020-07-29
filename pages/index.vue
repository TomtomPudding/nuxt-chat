<template>
  <a-row type="flex" justify="space-around" align="middle" style="height: 100vh">
    <a-col :span="6">
      <LoginForm :nameOnly=true />
    </a-col>
  </a-row>
</template>

<script type="ts" lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoginForm from '~/components/LoginForm.vue'
@Component({
  components: {
    LoginForm
  }
})
export default class login extends Vue { }
</script>
