<template>
  <a-layout style="min-height: 100vh">
    <side-navigation />
  </a-layout>
</template>

<script type="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SideNavigation from '~/components/SideNavigation.vue'
@Component({
  components: {
    SideNavigation
  }
})
export default class index extends Vue { }
</script>
