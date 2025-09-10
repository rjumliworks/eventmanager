<template>
    <Layout>
        <div class="page-title-box" style=" border-top: 1px solid #e0e0e0; position: fixed; width: 100%; margin-top: -24px; z-index: 100;">
            <h6 class="fw-bold mb-0">HOTELS</h6>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active fs-10">Talks highlighting science, technology, and innovation.</li>
            </ol>
        </div>
        <br/><br/>
        <!-- <b-list-group flush style="margin-left: -22px; margin-right: -22px; margin-bottom: 40px;">
            <template v-for="(list,index) in lists" v-bind:key="index">
                <router-link :to="{ path: '/session/'+list.id}">
                    <b-list-group-item  class="d-flex justify-content-between align-items-center ribbon-box right" style="cursor: pointer;" >
                        <BCardBody class="text-center p-4 w-100">
                            <img :src="list.avatar" alt="" class="avatar-sm rounded-circle object-fit-cover border border-5 border-light mx-auto d-block">
                            <h5 class="mb-0 mt-2 fs-13">
                                <router-link to="/ecommerce/seller-details" class="link-primary">{{ list.name }}</router-link>
                            </h5>
                            <p class="text-muted mb-4 fs-11">{{ list.email }}</p>
                            <div class="mt-0">
                                <router-link to="/ecommerce/seller-details" class="btn btn-light w-100">View Details</router-link>
                            </div>
                        </BCardBody>
                    </b-list-group-item>
                </router-link>
            </template>
        </b-list-group> -->
        <BRow class="mt-3">
            <BCol xl="3" lg="6" v-for="(list, index) of lists" :key="index">
                <BCard no-body class="ribbon-box right overflow-hidden">
                    <BCardBody class="text-center p-4 mt-n2">
                        <img :src="list.avatar" alt="" class="avatar-sm rounded-circle object-fit-cover border border-5 border-light mx-auto d-block">
                        <h5 class="mb-0 mt-2 fs-13">
                            <router-link to="/ecommerce/seller-details" class="link-primary">{{ list.name }}</router-link>
                        </h5>
                        <p class="text-muted mb-4 fs-11">{{ list.email }}</p>
                        <div class="mt-0">
                            <router-link :to="{ path: '/hotel/'+list.id}" class="btn btn-light w-100 fs-12">View Details</router-link>
                        </div>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
        
    </Layout>
</template>
<script>
import axios from 'axios';
import Layout from "@/layouts/main.vue";
export default {
    components: { Layout },
    data(){
        return {
            lists: [],
            participant_id: this.$store.state.auth.user.data.id,
            load: false
        }
    },
    created(){
        this.fetch();
    },
    methods: { 
        fetch(){
            this.load = false;
            axios.get('/hotels',{ params : {id : this.participant_id}})
            .then(response => {
                if(response){
                    this.lists = response.data.data;     
                    this.load = true;
                }
            })
            .catch(err => console.log(err));
        }
    }
};
</script>