<!-- <template>
 <router-view></router-view>

</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script> -->

 <template>
  <router-view></router-view>

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
    methods:{
       ...mapActions({
            loadData: 'data/loadInitialData',
        })
    }
  }
</script> 