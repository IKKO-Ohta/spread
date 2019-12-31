import { Vue } from 'vue-property-decorator'
import * as firebase from 'firebase/app'
import { Mixin } from 'vue-mixin-decorator'
import { getModule } from 'vuex-module-decorators'
import User from '@/store/user'

interface Stores {
  user: User
}

@Mixin
export default class PageMixin extends Vue {
  mounted() {
    // firebaseのログイン状況を監視する
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
