<template>
  <a-row type="flex" justify="space-around" align="middle" style="height: 100vh">
    <a-col :span="6">
      <LoginForm />
    </a-col>
  </a-row>
</template>

<script type="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoginForm from '~/components/LoginForm.vue'
@Component({
  components: {
    LoginForm
  }
})
export default class login extends Vue { }
</script>
