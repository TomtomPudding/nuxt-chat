<template>
  <a-row type="flex" justify="space-around" align="middle" class="login-main">
    <a-col :span="6">
      <LoginForm @LoginUser="LoginUser" />
    </a-col>
  </a-row>
</template>

<script lang="ts">
// https://firebase.google.com/docs/auth/web/start?hl=ja
import { Component, Vue } from 'nuxt-property-decorator'
import LoginForm from '~/components/LoginForm.vue'
import firebase from '@/plugins/firebase'
import { auth } from '@/store/auth'
import { SignInForm } from '~/interfaces/Auth';

@Component({
  components: {
    LoginForm
  }
})
export default class login extends Vue {
  async LoginUser(form: SignInForm) {
    console.log(form.email, form.password);
    try {
      await auth.signIn(form);
      this.$router.push("/chat");
    } catch(error) {
      console.log(error.message);
    }
  }
}
</script>
<style lang="scss">
.login-main {
  height: 100vh;
  background-color: #b52222;
}
</style>
