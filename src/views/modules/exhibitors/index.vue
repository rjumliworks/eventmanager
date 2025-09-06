<template>
    <Layout>
        <div class="page-title-box" style=" border-top: 1px solid #e0e0e0; position: fixed; width: 100%; margin-top: -24px; z-index: 100;">
            <h6 class="fw-bold mb-0">EXHIBITORS</h6>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active fs-10">Showcase of innovations, projects, and technologies.</li>
            </ol>
        </div>
        <br/><br/>
        
        <b-list-group flush style="margin-left: -22px; margin-right: -22px;">
            <template v-for="(list,index) in lists" v-bind:key="index">
                <b-list-group-item  class="d-flex justify-content-between align-items-center" style="cursor: pointer;" >
                    <div class="flex-grow-1">
                        <div class="blog-box mt-2 mb-4 mb-xl-0" >
                            <div class="mt-0  fs-12">
                                <h6 class="mb-1 fw-semibold text-primary">{{list.title}}</h6>
                                <p class="text-muted">{{list.area }}</p>
                                <p class="mb-n3"><i class="ri-team-fill text-primary me-1"></i>{{list.institution }}</p> 
                            </div>
                        </div>
                    </div>
                    <div class="flex-shrink-0 avatar-sm" @click="vote(list.id,index)">
                        <div v-if="list.has_voted" class="avatar-title bg-warning-subtle rounded-circle">
                            <i class="fs-20 ri-trophy-fill text-warning bx-tada"></i>
                        </div>
                        <div v-else class="avatar-title bg-light rounded-circle"><i class="fs-20 ri-trophy-fill text-primary"></i></div>
                    </div>
                </b-list-group-item>
            </template>
        </b-list-group>
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
            participant_id: this.$store.state.auth.user.id,
            load: false,
            index: null
        }
    },
    created(){
        this.fetch();
    },
    methods: { 
        fetch(){
            this.load = false;
            axios.get('/exhibitors',{ params : {id : this.participant_id}})
            .then(response => {
                if(response){
                    this.lists = response.data.data;     
                    this.load = true;
                }
            })
            .catch(err => console.log(err));
        },
        vote(id,index){
            this.index = index;
            axios.post('/exhibitors/vote',{
                participant_id: this.participant_id,
                exhibitor_id: id
            }).then(response => {
                this.lists[this.index].has_voted = response.data.data;
            }).catch(({response})=>{
                console.log(response);
            });
        }
    }
};
</script>