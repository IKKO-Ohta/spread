import { Mixins, Mixin } from 'vue-mixin-decorator'
import { AnalyticsHelper } from '@/lib/analytics-helper'
import PageMixin from '@/mixins/page-mixins'
import { FirestoreHelper } from '@/lib/firestore-helper'
import { recordHeader } from '@/models/const/record-header'
import { GameInfo } from '@/models/@types/game'
import { SheetInfo } from '@/models/@types/sheet-info'

@Mixin
export default class SheetPageMixin extends Mixins<PageMixin>(PageMixin) {
  sheetId = ''
  sheet: SheetInfo | null = null
  headers = recordHeader
  games: GameInfo[] = []

  created() {
    this.load()
  }

  async load() {
    this.sheetId = this.$route.params.slug
    this.stores.sheet.SET_CURRENT_SHEET_ID(this.sheetId)
    this.sheet = await this.stores.sheet.FETCH_ONLY_CURRENT_SHEET(this.sheetId)
    this.games = await this.stores.sheet.LOAD_GAMES()
    AnalyticsHelper.extractData(this.games)
  }

  async sendMail(mail: string): Promise<void> {
    const newMemberList = [...this.sheet!.members, mail]
    await this.stores.sheet.SET_SHEET({
      ...this.sheet!,
      members: newMemberList
    })
    await FirestoreHelper.sendMail(mail, window.location.href)
    this.stores.snackbar.SET_MESSAGE('招待メールを送りました。')
    await this.load()
  }

  async submitDeck(deck: string): Promise<void> {
    const newDeckList = [...this.sheet!.decks, deck]
    await this.stores.sheet.SET_SHEET({
      ...this.sheet!,
      decks: newDeckList
    })
    this.stores.snackbar.SET_MESSAGE('デッキを追加しました。')
    await this.load()
  }
}
