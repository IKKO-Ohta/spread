<template>
  <v-app dark>
    <v-navigation-drawer v-model="isDrawerOpen" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item-create-record />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="isDrawerOpen = !isDrawerOpen" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VListItemCreateRecord from '~/components/VListItemCreateRecord.vue'

interface SidebarItems {
  icon: string
  title: string
  to: string
}

@Component({
  components: {
    VListItemCreateRecord
  }
})
export default class extends Vue {
  readonly title = 'spread'
  readonly isDrawerOpen = false
  readonly items: SidebarItems[] = [
    {
      icon: 'mdi-apps',
      title: 'Welcome',
      to: '/'
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'first_sheet',
      to: '/records/myrecord'
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'secondRecord',
      to: '/records/second_record'
    }
  ]
}
</script>
