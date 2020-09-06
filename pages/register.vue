<template>
  <a-row type="flex" justify="space-around" align="middle" class="login-main">
    <a-col :span="6">
      <RegisterForm @createNewUser="createNewUser" />
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import RegisterForm from '~/components/RegisterForm.vue'
import firebase from '@/plugins/firebase'
import { auth } from '@/store/auth'
import { SignUpForm } from '~/interfaces/Auth'

@Component({
  components: {
    RegisterForm
  }
})
export default class login extends Vue {

  async createNewUser(form: SignUpForm) {
    console.log(form)
    try {
      auth.signUp(form).then(result =>{
        this.$router.push("/chat")
      });
    } catch(error) {
      console.log(error.message);
    };
  }
}
</script>
<style lang="scss">
.login-main {
  height: 100vh;
  background-color: #b52222;
}
</style>
