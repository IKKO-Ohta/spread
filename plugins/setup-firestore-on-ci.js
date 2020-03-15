import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import firebasekeyFromEnvVariable from '~/credentials/firebasekey-from-env-variable'

firebase.initializeApp(firebasekeyFromEnvVariable)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
Vue.prototype.$firestore = firebase.firestore()
