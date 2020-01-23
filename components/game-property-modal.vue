<template>
  <v-dialog v-if="isOpenModal" max-width="600px">
    <v-card class="form">
      <v-card-title>ゲーム詳細</v-card-title>
      <v-card-text>
        {{ game.myDeck }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed>
          デッキを追加する
        </v-btn>
        <v-btn depressed>
          閉じる
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator'
import { GameInfo } from '@/models/@types/game'

@Component
export default class EditDecks extends Vue {
  @Prop() game!: GameInfo | null
  @Prop({ default: false }) value!: boolean
  @Emit() update(_game: GameInfo): void {}
  @Emit() input(_newVal: boolean): void {}

  get isOpenModal() {
    return this.value || false
  }

  set isOpenModal(newValue: boolean) {
    this.input(newValue)
  }
}
</script>
