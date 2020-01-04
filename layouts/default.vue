<template>
  <v-app dark>
    <v-navigation-drawer v-model="isDrawerOpen" temporary fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item-create-record @create-sheet="createSheet" />
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
import { Component } from 'vue-property-decorator'
import { Mixins } from 'vue-mixin-decorator'
import { GameTitle } from '@/models/const/enums'
import PageMixin from '@/mixins/page-mixins'
import VListItemCreateRecord from '~/components/v-list-item-create-record.vue'
import { SheetInfo } from '~/models/const/sheet-info'

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
export default class DefaultLayout extends Mixins<PageMixin>(PageMixin) {
  readonly title = 'spread'
  readonly welcomeItem: SidebarItems = {
    icon: 'mdi-apps',
    title: 'Welcome',
    to: '/'
  }

  isDrawerOpen = false
  items: SidebarItems[] = [this.welcomeItem]

  async created(): Promise<void> {
    if (this.stores.sheet.currentSheetInfos.length === 0) {
      await this.refreshSheetInfos()
    }
  }

  async refreshSheetInfos(): Promise<void> {
    this.items = [this.welcomeItem]
    this.isDrawerOpen = false

    await this.stores.sheet.FETCH_SHEET()
    this.stores.sheet.currentSheetInfos.forEach((sheet) => {
      this.items.push({
        icon: 'mdi-chart-bubble',
        title: sheet.sheetName,
        to: `/records/${sheet.sheetName}`
      })
    })
  }

  async createSheet(sheetName: string, gameTitle: GameTitle): Promise<void> {
    const userMail = this.stores.user.currentUserInfo!.email
    const sheetInfo: SheetInfo = {
      member: [userMail],
      sheetName,
      gameTitle
    }
    await this.stores.sheet.CREATE_SHEET(sheetInfo)
    await this.refreshSheetInfos()
    this.$router.push(`/records/${sheetName}`)
  }
}
</script>
