<template>
  <a-card class="login-card">
    <a-form
      :form="form"
      @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="['name',
            { rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]}]"
          placeholder="name"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="['photoURL',
            { rules: [{ required: true, message: 'Please input your photoURL!', whitespace: false }]}]"
          placeholder="photoURL"
        >
          <a-icon slot="prefix" type="file-image" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
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
            'pass',
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
        <a-button type="primary" html-type="submit" class="login-form-button" :loading="isLoading">Sign Up</a-button>
        <a href="/">login now!</a>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { SignUpForm } from '~/interfaces/Auth';
import { auth } from '@/store/auth';
import firebase from '@/plugins/firebase';

@Component
export default class RegisterFormComponent extends Vue {
  form: any;
  isLoading: boolean = false;
  autoCompleteResult: string[] = [];

  created() {
    this.form = Vue.prototype.$form.createForm(this, { name: 'login' });
  }

  handleSubmit(event: Event) {
    this.isLoading = true;
    event.preventDefault();

    this.form.validateFields((err: any, values: any) => {
      console.log(err)
      if (err == null) {
        const formValue: SignUpForm = {
          "name": values["name"],
          "email": values["email"],
          "password": values["pass"],
          "photoURL": values["photoURL"]};
        console.log('Received values of form: ', values);
        return this.$emit("createNewUser", formValue);
      }
    });
    this.isLoading = false;
  }

  handleWebsiteChange(value: string) {
    var autoCompleteResult:string[] = [];
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.autoCompleteResult = autoCompleteResult;
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
