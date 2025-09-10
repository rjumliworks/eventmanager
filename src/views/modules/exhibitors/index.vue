<template>
    <Layout>
        <div class="page-title-box" style=" border-top: 1px solid #e0e0e0; position: fixed; width: 100%; margin-top: -24px; z-index: 100;">
            <h6 class="fw-bold mb-0">EXHIBITORS</h6>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active fs-10">Showcase of innovations, projects, and technologies.</li>
            </ol>
        </div>
        <br/><br/>
        <!-- <div class="alert alert-warning alert-dismissible alert-label-icon label-arrow fade show material-shadow" role="alert">
            <i class="ri-alert-line label-icon"></i><strong>Warning</strong> -
            Label icon arrow alert
        </div> -->
        <div class="alert alert-success alert-dismissible alert-label-icon label-arrow fade show material-shadow mt-1" role="alert" style="margin-left: -6px; margin-right: -6px;">
            <i class="ri-checkbox-circle-fill fs-18 label-icon"></i><span style="font-size: 11px;">Visited Exhibits</span> <b style="font-size: 11px;" class="float-end me-n4">0 / {{ lists.length }}</b>
        </div>
        <b-list-group flush style="margin-left: -22px; margin-right: -22px; margin-bottom: 40px;">
            <template v-for="(list,index) in lists" v-bind:key="index">
                <router-link :to="{ path: '/exhibitor/'+list.id}">
                    <b-list-group-item  class="d-flex justify-content-between align-items-center" style="cursor: pointer;" >
                        
                        <div class="card border shadow-none bg-light-subtle w-100 card-height-100 mb-2 mt-2">
                            <div class="card-body">
                                <div class="d-flex flex-column h-100">
                                    <div class="d-flex mb-n3">
                                        <!-- <div class="flex-shrink-0 me-3">
                                            <div class="avatar-sm">
                                                <span class="avatar-title bg-subtle rounded p-2 bg-warning-subtle">
                                                    <img src="@/assets/images/logo-sm.png" alt="" class="img-fluid p-1">
                                                </span>
                                            </div>
                                        </div> -->
                                        <div class="flex-grow-1">
                                            <h5 class="mb-1 fs-12 fw-semibold text-primary">{{list.title}}</h5>
                                            <p class="text-muted fs-10 text-truncate-two-lines mb-3">{{list.area}}</p>
                                        </div>
                                        <div class="flex-shrink-0 avatar-sm mt-n2">
                                            <div v-if="list.has_voted" class="avatar-title bg-warning-subtle rounded-circle">
                                                <i class="fs-20 ri-trophy-fill text-warning bx-tada"></i>
                                            </div>
                                            <div v-else class="avatar-title bg-light rounded-circle"><i class="fs-20 ri-trophy-line text-primary"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-transparent border-top-dashed py-2">
                                <div class="d-flex align-items-center fs-10">
                                    <div class="flex-grow-1">
                                        <i class="ri-team-fill text-danger me-1"></i>{{list.institution }}
                                    </div>
                                    <div class="flex-shrink-0">
                                        <div v-if="list.has_visited" class="text-success"><i class="ri-checkbox-circle-fill fs-11 me-1"></i>Visited</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </b-list-group-item>
                </router-link>
            </template>
        </b-list-group>
        <!-- <b-list-group flush style="margin-left: -22px; margin-right: -22px;">
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
        </b-list-group> -->
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
            axios.get('/exhibitors',{ params : {participant_id : this.participant_id}})
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