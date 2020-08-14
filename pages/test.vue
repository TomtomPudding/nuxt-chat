<template>
 <div class="page">
   <label>
     <span>
       お名前:
     </span>
     <input
       type="text"
       v-model="user.name"
     >
   </label>
   <label>
     <span>
       email:
     </span>
     <input
       type="text"
       v-model="user.email"
     >
   </label>
   <button
     type="button"
     @click="submit"
   >
     Submit
   </button>
 </div>
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
