import Vue from 'vue'
import Vuetify from 'vuetify'
import { Wrapper, shallowMount } from '@vue/test-utils'
import VListItemCreateRecord from '@/components/v-list-item-create-record.vue'

Vue.use(Vuetify)
describe('VListItemCreateRecord', () => {
  test('snapshot', () => {
    const wrapper: Wrapper<VListItemCreateRecord> = shallowMount(VListItemCreateRecord)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
