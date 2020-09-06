import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { User } from '@/interfaces/User';
import { SignUpForm, SignInForm } from '@/interfaces/Auth'
import firebase from '@/plugins/firebase';

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store<User>({});

@Module({dynamic: true, store ,stateFactory: true , name: "auth", namespaced: true})
export default class Auth extends VuexModule{
  user: User | null = null;

  @Mutation
  setUser(user: User | null) {
    this.user = user;
  }

  @Action({rawError: true})
  alreadyLoggedIn() {
    const currentUser = firebase.auth().currentUser
    if(this.user === null && currentUser !== null) {
      this.setUser({
        "uid": currentUser.uid,
        "name": currentUser.displayName || "unknown",
        "photoURL": currentUser.photoURL || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        "friends": [],
        "rooms": []
      });
    }
    return this.user !== null && firebase.auth().currentUser !== null
  }

  // ログイン
  @Action({rawError: true})
  async signIn(form: SignInForm) {
    if(this.user) {
      this.signOut();
    }

    const result = firebase.auth().signInWithEmailAndPassword(form.email, form.password)
    .catch(function(error: firebase.auth.Error) {
      throw new Error(error.code + ": " + error.message)
    });

    const currentUser: firebase.User | null = (await result).user;
    if(currentUser) {
      this.setUser({
        "uid": currentUser.uid,
        "name": currentUser.displayName || "unknown",
        "photoURL": currentUser.photoURL || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        "friends": [],
        "rooms": []
      });
    }
  }

  // ログアウト
  @Action({rawError: true})
  async signOut() {
    const currentUser = firebase.auth().signOut().catch(function(error: firebase.auth.Error) {
      throw new Error(error.code + ": " + error.message);
    });
    await currentUser.then(result => {
      this.setUser(null);
    });
  }

  // 新規登録
  @Action({rawError: true})
  async signUp(form: SignUpForm) {
    if(this.user) {
      await this.signOut();
    }

    const result = firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
    .catch(function(error: firebase.auth.Error) {
      throw new Error(error.code + ": " + error.message);
    });

    const currentUser = (await result).user
    if(currentUser) {
      await currentUser.updateProfile({
        "displayName" : form.name,
        "photoURL" : form.photoURL
      })
      await this.signIn({"email": form.email, "password": form.password})
    }
  }

}

export const auth = getModule(Auth);
