<template>
  <div class="message-form">

    <form @submit="">
      <a-row :gutter="8">
        <a-col :span="20">

          <a-input
            v-decorator="[
              'message',
              { rules: [{ required: true, message: 'Please input the message!' }] },
            ]"
            class="text"
            type="textarea" auto-size
            v-on:keypress.enter="handlerEnter"
            v-model="text"
          />

          <input type="hidden" name="id" :text="id">
          <input type="hidden" name="name" :value="name">
          <input type="hidden" name="photoURL" :value="photoURL">
        </a-col>
        <a-col :span="4">
          <div class="submit" @click="handlerAddMessage">Send</div>
        </a-col>
        <div style="clear:both"></div>
      </a-row>
    </form>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {Chat} from '@/interfaces/Chat';

@Component
export default class MessageForm extends Vue {

  @Prop({ type: String, required: true })
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  text: string = "";

  @Prop({ type: String, required: true })
  photoURL!: string;

  handlerAddMessage() {
    this.addMessage();
  }

  handlerEnter(event: KeyboardEvent) {


    if(event.shiftKey){
      return false;
    }
    this.addMessage();
    event.preventDefault();
  }

  private addMessage() {
    const message:Chat = {"id": this.id, "name": this.name,"text": this.text, "photoURL": this.photoURL};
    this.text = "";
    this.$emit('addMessage', message);
  }
}
</script>


<style lang="scss">
.message-form {
  margin-bottom: 10px;
  .text {
    padding: 3px;
  }

  .submit {
    color: #fff;
    cursor: pointer;
    position: absolute;
    font-weight: 1000;
    font-size: 24px;
    right: 15px;
    top: -2.5px;
    text-shadow:2px 2px 0 #000,-2px 2px 0 #000,2px -2px 0 #000,-2px -2px 0 #000;
  }
}
</style>
