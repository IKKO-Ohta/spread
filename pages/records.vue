<template>
  <div>
    <v-card class="form">
      <v-card-title>ゲームレコードを登録</v-card-title>
      <v-card-text>
        <submitGameForm :decklist="decklist" />
      </v-card-text>
      <v-card-actions>
        <v-btn depressed>登録</v-btn>
      </v-card-actions>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1 table"
    ></v-data-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import recordHeader from '@/models/const/record-header'
import spams from '@/models/const/spams'
import archtypes from '@/models/const/archtypes'
import submitGameForm from '@/components/submit-game-form.vue'

@Component({
  components: {
    submitGameForm
  },
  head: {
    title: '対戦記録'
  }
})
export default class RecordPage extends Vue {
  headers = recordHeader()
  desserts = spams()
  decklist = archtypes()

  mounted() {
    console.log(this.decklist)
  }
}
</script>

<style lang="scss">
.form {
  margin-bottom: 10px;
}
</style>