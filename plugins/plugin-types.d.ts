import firebase from 'firebase'

declare module 'vue/types/vue' {
  interface Vue {
    $firestore: firebase.firestore.Firestore
  }
}
