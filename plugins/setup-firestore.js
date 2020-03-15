import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import firebasekeyFromEnvVariable from '~/credentials/firebasekey-from-env-variable'
import firebasekey from '~/credentials/firebasekey'

if (process.env.ci) {
  firebase.initializeApp(firebasekeyFromEnvVariable)
} else {
  firebase.initializeApp(firebasekey)
}
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
Vue.prototype.$firestore = firebase.firestore()
