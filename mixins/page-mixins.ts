import { Vue } from 'vue-property-decorator'
import * as firebase from 'firebase/app'
import { Mixin } from 'vue-mixin-decorator'
import { getModule } from 'vuex-module-decorators'
import User from '@/store/user'
import Sheet from '@/store/sheet'
import Snackbar from '@/store/snackbar'

interface Stores {
  user: User
  sheet: Sheet
  snackbar: Snackbar
}

@Mixin
export default class PageMixin extends Vue {
  created() {
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
      user: this._user,
      sheet: this._sheet,
      snackbar: this._snackbar
    }
  }

  private get _user(): User {
    return getModule(User, this.$store)
  }

  private get _sheet(): Sheet {
    return getModule(Sheet, this.$store)
  }

  private get _snackbar(): Snackbar {
    return getModule(Snackbar, this.$store)
  }
}
