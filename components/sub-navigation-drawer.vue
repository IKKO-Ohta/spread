<template>
  <v-navigation-drawer v-model="drawerValue" absolute right temporary>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Your Team Name</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import UlTooltip from '@/components/ul-tooltip.vue'

@Component({
  components: { UlTooltip }
})
export default class SubNavigationDrawer extends Vue {
  @Prop() value!: boolean
  @Emit() input(_val: boolean): void {}

  items = [
    { title: '対戦記録', icon: 'mdi-checkerboard' },
    { title: '分析', icon: 'mdi-chart-pie' },
    { title: 'デッキ管理', icon: 'mdi-account' },
    { title: 'チーム設定', icon: 'mdi-account-group-outline' }
  ]

  set drawerValue(val: boolean) {
    this.input(val)
  }

  get drawerValue(): boolean {
    return this.value !== undefined ? this.value : false
  }
}
</script>
