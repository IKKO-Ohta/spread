import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import firebasekey from '~/credentials/firebasekey'

firebase.initializeApp(firebasekey)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
Vue.prototype.$firestore = firebase.firestore()
