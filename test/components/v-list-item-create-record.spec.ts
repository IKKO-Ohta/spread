import Vue from 'vue'
import Vuetify from 'vuetify'
import { Wrapper, shallowMount } from '@vue/test-utils'
import VListItemCreateSheet from '@/components/v-list-item-create-sheet.vue'

Vue.use(Vuetify)
describe('VListItemCreateSheet', () => {
  test('snapshot', () => {
    const wrapper: Wrapper<VListItemCreateSheet> = shallowMount(VListItemCreateSheet)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
