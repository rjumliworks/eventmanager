<template>
    <div id="app" :class="{ 'safe-area': isIos }">
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
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: constant(safe-area-inset-top); /* fallback old iOS */
}
</style>