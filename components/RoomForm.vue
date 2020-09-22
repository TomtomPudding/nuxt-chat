<template>
  <a-form :form="form" @submit="handleSubmit" class="room-form">

    <a-form-item
      label="RoomName"
      v-bind="formItemLayout"
      :required="false"
      style="margin-bottom: 0px;"
      >
      <a-input
        v-decorator="['roomName',
          { rules: [{ required: true, message: 'Please input your room name!', whitespace: true }]}]"
        placeholder="room name"
      >
        <a-icon slot="prefix" type="home" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item
      label="PhotoURL"
      v-bind="formItemLayout"
      :required="false"
      style="margin-bottom: 0px;"
      >
      <a-input
        v-decorator="['photoURL',
          { rules: [{ required: true, message: 'Please input your photoURL!', whitespace: false }]}]"
        placeholder="photoURL"
      >
        <a-icon slot="prefix" type="file-image" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item
      v-for="(rowkey, index) in form.getFieldValue('members')"
      :key="rowkey"
      v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
      :label="index === 0 ? 'Users' : ''"
      :required="false"
      style="margin-bottom: 0px;"
    >
      <a-input
        v-decorator="[
          `names[${rowkey}]`,
          { validateTrigger: ['change', 'blur'],
            rules: [
              { required: true, whitespace: true, message: 'Please input userId or delete this field.'}
            ],
          }, ]"
        placeholder="member id"
        style="width: 90%; margin-right: 8px">
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
      <a-icon
        class="dynamic-delete-button"
        type="minus-circle-o"
        :disabled="form.getFieldValue('members').length === 1"
        @click="() => removeRow(rowkey)"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 100%" @click="appendRow">
        <a-icon type="plus" /> Add userId field
      </a-button>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script type="ts" lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { auth } from '@/store/auth';
import { addRoom } from '@/plugins/firebase-store';
import { Room } from '@/interfaces/Room';

@Component
export default class RoomFormComponent extends Vue {
  userIdCount = 0;
  form: any;

  formItemLayout =  {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 }
    }
  };
  formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 }
    }
  };

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

  beforeCreate() {
    this.form = Vue.prototype.$form.createForm(this, { name: 'room_form' });
    this.form.getFieldDecorator('members', { initialValue: [], preserve: true });
  }

  // created() {
  //   this.appendRow();
  // }

  removeRow(rowkey: Event) {
    const members:any = this.form.getFieldValue('members');
    if (members.length <= 0) {
      return;
    }

    this.userIdCount--;

    this.form.setFieldsValue({
      members: members.filter(function(element: any) { return element != rowkey;})
    });
  }

  appendRow() {
    const members = this.form.getFieldValue('members');
    const nextmembers= members.concat(this.userIdCount++);

    this.form.setFieldsValue({
      members: nextmembers,
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (err == null) {
        const form: Room = {
          "id": null,
          "name": values["roomName"],
          "photoURL":  values["photoURL"],
          "members": values["members"].concat([this.user.uid]),
          "chatLog": []};
        addRoom(form);
      }
    });
  }
}

</script>
<style lang="scss">
.room-form {
  width: 60%;
  margin: 10px 5px 5px 25px;

  .dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
  }
  .dynamic-delete-button:hover {
    color: #777;
  }
  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
