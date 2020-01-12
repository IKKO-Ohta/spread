<template>
  <v-snackbar v-model="isOpenSnackbar" :color="color" :timeout="DURATION">
    <span class="white--text"> {{ snackbarText }} </span>
    <v-btn color="white" text @click="isOpenSnackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import Snackbar from '@/store/snackbar'

@Component({})
export default class UlSnackBar extends Vue {
  readonly DURATION = 3000
  isOpenSnackbar = false
  isError = false
  snackbarText = ''
  unwatch = (): void => {}

  created() {
    this.unwatch = this.$store.watch(
      (state) => (state.snackbar as Snackbar).message,
      () => {
        const snackbarModule = this._snackbar
        const message = snackbarModule.message
        const isError = snackbarModule.isError
        this.isOpenSnackbar = true

        if (message !== '') {
          this.snackbarText = message
          this.isError = isError
          setTimeout(() => {
            snackbarModule.CLEAR()
          }, this.DURATION)
        }
      }
    )
  }

  destroyed() {
    this.unwatch()
  }

  get color(): string {
    return this.isError ? 'deep-orange darken-4' : 'green darken-4'
  }

  get _snackbar(): Snackbar {
    return getModule(Snackbar, this.$store)
  }
}
</script>
