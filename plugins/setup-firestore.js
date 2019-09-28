import Vue from 'vue'
import firestoreInit from '~/service/firestore-init'

Vue.prototype.$firestore = firestoreInit()
