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
          <v-btn depressed :disabled="!canSubmit" @click="submitDeck">
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
        <v-card-title>{{ targetDeck }}</v-card-title>
        <v-spacer />
        <v-card-subtitle> 記入 </v-card-subtitle>
        <v-card-text>
          <v-textarea v-model="textarea" auto-grow rows="3" outlined :placeholder="placeholderText"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeProfileDialog">
            一覧に戻る
          </v-btn>
          <v-btn color="secondary">
            削除する
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
  @Emit() submit(_deck: string): void {}

  decks: string[] = []
  newDeck = ''
  dialog = false
  profileDialog = false
  targetDeck = ''
  textarea = ''

  openDialog() {
    this.decks = this.getDecks()
    this.dialog = true
  }

  closeDialog() {
    this.dialog = false
    this.newDeck = ''
  }

  openProfileDialog(targetDeck: string) {
    this.profileDialog = true
    this.targetDeck = targetDeck
  }

  closeProfileDialog() {
    this.profileDialog = false
  }

  submitDeck(): void {
    this.dialog = false
    this.submit(this.newDeck)
    this.newDeck = ''
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
