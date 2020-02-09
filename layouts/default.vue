<template>
  <v-app>
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
        <v-list-item-create-sheet @create-sheet="createSheet" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="handleDrawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <ul-snackbar />
  </v-app>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Mixins } from 'vue-mixin-decorator'
import { GameTitle } from '@/models/const/enums'
import PageMixin from '@/mixins/page-mixins'
import VListItemCreateSheet from '@/components/v-list-item-create-sheet.vue'
import UlSnackbar from '@/components/ul-snackbar.vue'
import { SheetInfo } from '@/models/@types/sheet-info'
import { DeckHelper } from '@/lib/deck-helper'
import { FirestoreHelper } from '@/lib/firestore-helper'
import { SheetHelper } from '@/lib/sheet-helper'

interface SidebarItems {
  icon: string
  title: string
  to: string
}

@Component({
  components: {
    VListItemCreateSheet,
    UlSnackbar
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

  mounted(): void {
    this.refreshSheetInfos()
  }

  refreshSheetInfos(): void {
    this.items = [this.welcomeItem]
    this.isDrawerOpen = false
    this.loadItems()
  }

  handleDrawer(): void {
    this.loadItems()
    this.isDrawerOpen = !this.isDrawerOpen
  }

  async loadItems(): Promise<void> {
    this.items = [this.welcomeItem]
    if (this.stores.user.currentUserInfo) {
      await this.stores.sheet.FETCH_SHEET(this.stores.user.currentUserInfo.email!)
      this.stores.sheet.currentSheetInfos.forEach((sheet: SheetInfo) => {
        this.items.push({
          icon: 'mdi-chart-bubble',
          title: sheet.sheetName,
          to: `/sheets/${sheet.id}`
        })
      })
    }
  }

  async createSheet(sheetName: string, gameTitle: GameTitle): Promise<void> {
    const userMail = this.stores.user.currentUserInfo!.email
    const id = FirestoreHelper.generateId()
    const sheetInfo: SheetInfo = {
      id,
      members: [userMail],
      sheetName,
      gameTitle,
      decks: DeckHelper.getDefaultDecks(gameTitle),
      bestOf: SheetHelper.getDBestOf(gameTitle)
    }
    await this.stores.sheet.SET_SHEET(sheetInfo)
    await this.refreshSheetInfos()
    this.$router.push(`/sheets/${id}`)
  }
}
</script>
