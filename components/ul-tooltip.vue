<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <slot />
      </v-btn>
    </template>
    <span>{{ message }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class UlTooltip extends Vue {
  @Prop({ required: true }) message!: string
}
</script>
