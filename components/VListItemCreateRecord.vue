<template>
  <section>
    <v-list-item @click="openDialog">
      <v-list-item-action>
        <v-icon>{{ createButton.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="createButton.text" />
      </v-list-item-content>
    </v-list-item>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card class="form">
        <v-card-title> create a new record</v-card-title>
        <v-card-text>
          <v-text-field v-model="sheetName" label="sheet name" required>
          </v-text-field>
          <v-select
            v-model="selectedGameTitle"
            label="Game"
            :items="gameTitles"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn depressed @click="submit"> Create </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AllGameTitles, GameTitle } from '~/models/const/Enums'

@Component({})
export default class VlistItemCreateRecord extends Vue {
  readonly createButton = {
    text: 'create a new record',
    icon: 'mdi-checkerboard-plus'
  }

  readonly gameTitles = AllGameTitles
  dialog = false
  selectedGameTitle: GameTitle | '' = ''
  sheetName = ''

  openDialog(): void {
    this.dialog = true
  }

  submit(): void {
    // eslint-disable-next-line no-console
    console.log(this.sheetName, this.selectedGameTitle)
  }
}
</script>
