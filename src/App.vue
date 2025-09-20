<template>
    <div id="app" class="safe-area">
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'App',
        components: {},
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
/* Safe area handling */
.safe-area {
  /* Base padding for all platforms */
  padding-top: 16px;

  /* Add safe area on iOS automatically */
  padding-top: calc(16px + env(safe-area-inset-top));
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);

  /* Fallback for older iOS */
  padding-top: calc(16px + constant(safe-area-inset-top));
}
</style>