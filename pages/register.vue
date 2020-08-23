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

@Component({
  components: {
    RegisterForm
  }
})
export default class login extends Vue {
  createNewUser(name: string, email: string, password: string) {
    console.log("aa")
    console.log(name, email, password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        console.log(result);
        this.$router.push("/");
      }).catch(function(error: any) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
}
</script>
<style lang="scss">
.login-main {
  height: 100vh;
  background-color: #b52222;
}
</style>
