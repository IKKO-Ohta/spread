<template>
  <section>
    <ul-tooltip message="デッキ管理">
      <v-icon @click="openDialog">mdi-cards-outline</v-icon>
    </ul-tooltip>
    <!-- TODO: dialogを上に移し、v-modelで管理するようにし、ステートを減らす -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card class="form">
        <v-card-title>デッキ管理</v-card-title>
        <v-card-text>
          <v-list>
            <v-subheader>現在登録しているデッキ</v-subheader>
            <v-list-item v-for="(deck, i) in decks" :key="i">
              <v-list-item-content>
                <v-list-item-title @click="openProfileDialog(deck)"> {{ deck }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-text>
          <v-text-field v-model="newDeck" label="追加するデッキ名" required> </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed :disabled="!canSubmit" @click="saveDeck">
            デッキを追加する
          </v-btn>
          <v-btn depressed @click="closeDialog">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="profileDialog" max-width="600px" overlay-opacity="1" class="form layer">
      <v-card>
        <v-card-title>
          <v-toolbar-title>{{ targetDeck }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon>mdi-delete</v-icon>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-subtitle>デッキリスト</v-card-subtitle>
        <v-card-text>
          <v-textarea v-model="targetDecklist" auto-grow rows="10" outlined :placeholder="placeholderText"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="saveDecklist">
            保存する
          </v-btn>
          <v-btn>
            戻る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator'
import UlTooltip from '@/components/ul-tooltip.vue'
import { SheetInfo } from '@/models/@types/sheet-info'

@Component({
  components: { UlTooltip }
})
export default class EditDecks extends Vue {
  @Prop() sheetInfo!: SheetInfo | null
  @Emit() submitDeck(_deck: string): void {}
  @Emit() submitDecklist(_deck: string, _decklist: string): void {}

  decks: string[] = []
  newDeck = ''
  dialog = false
  profileDialog = false
  targetDeck = ''
  targetDecklist = ''

  openDialog() {
    this.decks = this.getDecks()
    this.dialog = true
  }

  closeDialog() {
    this.dialog = false
    this.newDeck = ''
  }

  openProfileDialog(targetDeck: string) {
    this.targetDeck = targetDeck
    const decklists = this.sheetInfo!.decklists
    if (decklists && decklists[targetDeck]) {
      this.targetDecklist = decklists[targetDeck]
    } else {
      this.targetDecklist = ''
    }

    this.profileDialog = true
  }

  closeProfileDialog() {
    this.profileDialog = false
  }

  saveDeck(): void {
    this.dialog = false
    this.submitDeck(this.newDeck)
    this.newDeck = ''
  }

  saveDecklist(): void {
    this.submitDecklist(this.targetDeck, this.targetDecklist)
    this.profileDialog = false
  }

  getDecks(): string[] {
    return this.sheetInfo ? this.sheetInfo.decks : []
  }

  get canSubmit(): boolean {
    return this.newDeck !== ''
  }

  get placeholderText(): string {
    return 'デッキリストを記入できます'
  }
}
</script>
