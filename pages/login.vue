<template>
  <a-card hoverable style="width: 450px">
    <template slot="actions" class="ant-card-actions">
      <a-icon key="setting" type="setting" />
      <a-icon key="edit" type="edit" />
      <a-icon key="ellipsis" type="ellipsis" />
    </template>
    <a-card-meta title="Card title" description="This is the description">
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
    </a-card-meta>
  </a-card>
</template>


<script>
import firebase from '@/plugins/firebase'

export default {
 data () {
   return {
     user: {
       name: "",
       email: ""
     },
   }
 },
 methods: {
   submit () {
     debugger
     const db = firebase.firestore()
     let dbUsers = db.collection('users')
     dbUsers
       .add({
         name: this.user.name,
         email: this.user.email,
       })
       .then(ref => {
         console.log('Add ID: ', ref.id)
       })
   },
 },
}
</script>
