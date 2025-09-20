<template>
  <div id="app" :class="{ 'safe-area': applySafeArea }">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Capacitor } from '@capacitor/core'

export default {
  name: 'App',
  data() {
    return {
      isIos: Capacitor.getPlatform() === 'ios'
    }
  },
  computed: {
    applySafeArea() {
      return this.isIos && this.$route.path !== '/dashboard'
    }
  },
  async created() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await Promise.all([
          this.loadData(),
        ]);
      } catch (err) {
        console.error('Failed to preload data', err);
      }
    }
  },
  methods: {
    ...mapActions({
      loadData: 'data/loadInitialData',
    })
  }
}
</script>

<style>
.safe-area {
  padding-top: calc(16px + env(safe-area-inset-top));
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);

  /* Fallback for older iOS */
  padding-top: calc(16px + constant(safe-area-inset-top));
}
</style>
