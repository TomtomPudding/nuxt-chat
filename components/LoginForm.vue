<template>
  <a-card class="login-card">
    <a-form
      :form="form"
      @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="[
            'email',
            { rules: [
                { type: 'email', message: 'The input is not valid E-mail!', },
                { required: true, message: 'Please input your E-mail!', }, ],
            }, ]"
          placeholder="email"
        >
          <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [
                { required: true, message: 'Please confirm your password!', }, ],
            }, ]"
          type="password"
          placeholder="password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button" :loading="isLoading">Log in</a-button>
        <a href="/register">register now!</a>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { SignInForm } from '~/interfaces/Auth';
import { auth } from '@/store/auth';
import firebase from '@/plugins/firebase';

@Component
export default class LoginFormComponent extends Vue {
  form: any;
  isLoading: boolean = false;

  beforeCreate() {
    if(auth.user && !this.$route.query?.page) {
      return;
    }
    firebase.auth().onAuthStateChanged(async currentUser => {
      auth.alreadyLoggedIn();
      if (auth.user) {
        const path:string = this.$route.query?.page?.toString() || "chat";
        this.$router.push(path)
      } else {
        this.$router.push("/")
      }
    })
  }

  created() {
    this.form = Vue.prototype.$form.createForm(this, { name: 'login' });
  }

  handleSubmit(event: Event) {
    this.isLoading = true;
    event.preventDefault();

    this.form.validateFields((err: any, values: any) => {
      console.log(err)
      if (err == null) {
        console.log('Received values of form: ', values);
        const formValue: SignInForm =
        {"email" :values["email"], "password": values["password"]};
        return this.$emit("LoginUser", formValue);
      }
    });
    this.isLoading = false;
  }
}
</script>
<style lang="scss">
.login-card {
  width: 450px;

  .login-form-forget {
    float: right;
  }

  .login-form-button {
    width: 100%;
  }
}
</style>
