<template>
  <a-card class="login-card">
    <a-form
      :form="form"
      @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="['name',
            { rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],},]"
          placeholder="name"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
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
            'confile',
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
        <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>
        <a href="/login">Create your account!</a>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class RegisterFormComponent extends Vue {
  form: any;

  created() {
    this.form = Vue.prototype.$form.createForm(this, { name: 'login' });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      console.log(err)
      if (err == null) {
        console.log('Received values of form: ', values);
        return this.$emit("createNewUser", values["name"], values["email"], values["confile"]);
      }
    });
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
