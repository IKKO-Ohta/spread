<template>
  <section>
    <v-card class="form">
      <v-card-title>デッキ パフォーマンス</v-card-title>
      <v-list>
        <v-list-item v-for="(game, i) in games" :key="i">
          <v-list-item-content>
            <span> {{ game.win }}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Game } from '@/models/@types/game'

@Component({})
export default class PerformanceMatrix extends Vue {
  @Prop({ required: true }) games!: Game[]
}
</script>
