import firebasekey from '~/credentials/firebasekey'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default () => {
  firebase.initializeApp(firebasekey)
  return firebase.firestore()
}
