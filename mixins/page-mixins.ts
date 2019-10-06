import Vue from 'vue'
import * as firebase from 'firebase/app'
import { Mixin } from 'vue-mixin-decorator'
import User from '@/store/user'
import { getModule } from 'vuex-module-decorators'

interface Stores {
  user: User
}

@Mixin
export default class PageMixin extends Vue {
  mounted() {
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      if (user !== null && this.stores.user.currentUserInfo === null) {
        this.stores.user.SET_USER({
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName
        })
      }
    })
  }

  get stores(): Stores {
    return {
      user: this._user
    }
  }

  private get _user(): User {
    return getModule(User, this.$store)
  }
}
