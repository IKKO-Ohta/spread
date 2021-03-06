import { Mixins, Mixin } from 'vue-mixin-decorator'
import { NuxtConfigurationHead } from '@nuxt/types/config/head'
import { PerformanceMatrixHelper } from '~/lib/performance-matrix-helper'
import PageMixin from '@/mixins/page-mixins'
import { FirestoreHelper } from '@/lib/firestore-helper'
import { recordHeader } from '@/models/const/record-header'
import { GameInfo } from '@/models/@types/game'
import { SheetInfo } from '@/models/@types/sheet-info'
import { BestOf } from '~/models/const/enums'

@Mixin
export default class SheetPageMixin extends Mixins<PageMixin>(PageMixin) {
  sheetId = ''
  sheet: SheetInfo | null = null
  headers = recordHeader
  games: GameInfo[] = []

  created() {
    this.load()
  }

  head(): NuxtConfigurationHead {
    return {
      title: this.sheet ? `${this.sheet.sheetName} - spread` : 'spread'
    }
  }

  async load() {
    this.sheetId = this.$route.params.slug
    this.stores.sheet.SET_CURRENT_SHEET_ID(this.sheetId)
    this.sheet = await this.stores.sheet.FETCH_ONLY_CURRENT_SHEET(this.sheetId)
    this.games = await this.stores.sheet.LOAD_GAMES()
    PerformanceMatrixHelper.extractData(this.games)
  }

  async sendMail(mail: string): Promise<void> {
    const newMemberList = [...this.sheet!.members, mail]
    await this.stores.sheet.SET_SHEET({
      ...this.sheet!,
      members: newMemberList
    })
    const url = `https://${window.location.host}`
    await FirestoreHelper.sendMail(mail, url)
    this.stores.snackbar.SET_MESSAGE('招待メールを送りました。')
    await this.load()
  }

  async submitDeck(deck: string): Promise<void> {
    const newDecks = [...this.sheet!.decks, deck]
    await this.stores.sheet.SET_SHEET({
      ...this.sheet!,
      decks: newDecks
    })
    this.stores.snackbar.SET_MESSAGE('デッキを追加しました。')
    await this.load()
  }

  async submitDecklist(deck: string, decklist: string): Promise<void> {
    const decklists = this.sheet!.decklists || {}
    decklists[deck] = decklist
    await this.stores.sheet.SET_SHEET({
      ...this.sheet!,
      decklists
    })
    this.stores.snackbar.SET_MESSAGE('デッキリストを保存しました。')
    await this.load()
  }

  async submitDelete(deletedDeck: string): Promise<void> {
    const decks = this.sheet!.decks.filter((elem) => elem !== deletedDeck)
    if (this.sheet!.decklists) {
      const decklists = { ...this.sheet!.decklists! }
      delete decklists[deletedDeck]

      await this.stores.sheet.SET_SHEET({
        ...this.sheet!,
        decks,
        decklists
      })
    } else {
      await this.stores.sheet.SET_SHEET({
        ...this.sheet!,
        decks
      })
    }

    this.stores.snackbar.SET_MESSAGE(`デッキ ${deletedDeck}を削除しました。`)
    await this.load()
  }

  get isBo3(): boolean {
    return this.sheet?.bestOf === BestOf.Bo3
  }
}
