<template>
  <div
    id="app"
    :class="{ 'safe-area': applySafeArea }"
    class="scroll-container"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="refresh-indicator" v-if="refreshing">
      🔄 Refreshing...
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Capacitor } from '@capacitor/core';

export default {
  name: 'App',
  data() {
    return {
      isIos: Capacitor.getPlatform() === 'ios',
      startY: 0,
      refreshing: false,
    };
  },
  computed: {
    applySafeArea() {
      const path = this.$route.path;
      return this.isIos && path !== '/' && path !== '/login' && path !== '/register';
    },
  },
  async created() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await Promise.all([this.loadData()]);
      } catch (err) {
        console.error('Failed to preload data', err);
      }
    }
  },
  methods: {
    ...mapActions({ loadData: 'data/loadInitialData' }),

    onTouchStart(e) {
      if (window.scrollY === 0) {
        this.startY = e.touches[0].clientY;
      }
    },
    onTouchMove(e) {
      const distance = e.touches[0].clientY - this.startY;
      if (distance > 80 && window.scrollY === 0 && !this.refreshing) {
        this.triggerRefresh();
      }
    },
    onTouchEnd() {
      this.startY = 0;
    },
    triggerRefresh() {
      this.refreshing = true;
      console.log('Refreshing...');

      // Call Vuex action to reload data
      this.loadData().finally(() => {
        this.refreshing = false;
      });
    },
  },
};
</script>

<style>
.scroll-container {
  overflow-y: auto;
  height: 100vh;
  -webkit-overflow-scrolling: touch; /* smooth scroll for iOS */
}

.refresh-indicator {
  text-align: center;
  padding: 16px;
  background-color: #f0f0f0;
}

.safe-area {
  padding-top: calc(16px + env(safe-area-inset-top));
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);

  /* Fallback for older iOS */
  padding-top: calc(16px + constant(safe-area-inset-top));
}
</style>
