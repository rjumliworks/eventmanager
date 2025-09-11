<template>
    <Layout>
        <div class="page-title-box" style=" border-top: 1px solid #e0e0e0; position: fixed; width: 100%; margin-top: -24px; z-index: 100;">
            <h6 class="fw-bold mb-0">SESSIONS</h6>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active fs-10">Talks highlighting science, technology, and innovation.</li>
            </ol>
        </div>
        <br/><br/>

        <div class="alert alert-secondary alert-dismissible alert-label-icon label-arrow fade show material-shadow mt-1" role="alert" style="margin-left: -6px; margin-right: -6px;">
            <i class="ri-article-fill label-icon"></i><span style="font-size: 11px;">Please select a <b>session</b> and <b>register.</b></span>
        </div>
        <b-list-group flush style="margin-left: -22px; margin-right: -22px; margin-bottom: 40px;">
            <template v-for="(list,index) in lists" v-bind:key="index">
                <router-link :to="{ path: '/session/'+list.id}">
                    <b-list-group-item  class="d-flex justify-content-between align-items-center ribbon-box right" style="cursor: pointer;" >
                        
                        <div class="card border shadow-none bg-light-subtle w-100 card-height-100 mb-2 mt-2">
                            <div v-if="list.status.name == 'Ongoing'" class="ribbon-two ribbon-two-warning" style="z-index:50;"><span style="font-size: 8px; ">Ongoing</span></div>
                            <div v-else-if="list.has_registered" class="ribbon-two ribbon-two-secondary" style="z-index:50;"><span style="font-size: 8px; ">Registered</span></div>
                            <div class="card-body">
                                <div class="d-flex flex-column h-100">
                                    <div class="d-flex">
                                        <!-- <div class="flex-grow-1">
                                            <p class="text-muted fs-10 mb-3">{{ list.status.name }}</p>
                                        </div> -->
                                        
                                    </div>
                                    <div class="d-flex mb-n1">
                                        <div class="flex-shrink-0 me-3">
                                            <div class="avatar-sm">
                                                <span class="avatar-title bg-subtle rounded p-2 bg-warning-subtle">
                                                    <img src="@/assets/images/logo-sm.png" alt="" class="img-fluid p-1">
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1">
                                            <h5 class="mb-1 fs-12 fw-semibold text-primary">{{list.title}}</h5>
                                            <p class="text-muted fs-10 text-truncate-two-lines">{{list.detail.description}}</p>
                                        </div>
                                    </div>
                                    <!-- <div class="mt-auto" v-if="!list.is_limited">
                                        <div class="d-flex mb-2">
                                            <div class="flex-grow-1">
                                                <div class="fs-11"><i class="ri-map-pin-fill me-1"></i>{{list.venue.name}}, {{ list.venue.establishment }}</div>
                                            </div>
                                            <div class="flex-shrink-0">
                                                <div><i class="ri-list-check align-bottom me-1 text-muted"></i> {{list.participants.length}}/100</div>
                                            </div>
                                        </div>
                                        <div class="progress progress-sm animated-progess">
                                            <div class="progress-bar bg-success" role="progressbar" aria-valuenow="34" aria-valuemin="0" aria-valuemax="100" style="width: 34%;"></div>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                            <div class="card-footer bg-transparent border-top-dashed py-2">
                                <div class="d-flex align-items-center fs-10">
                                    <div class="flex-grow-1">
                                        <i class="ri-map-pin-fill text-danger me-1"></i>{{list.venue.name}}, {{ list.venue.establishment }}
                                        
                                    </div>
                                    <div class="flex-shrink-0">
                                        <div><i class="ri-calendar-event-fill text-info me-1 align-bottom"></i>{{dateRangeText(list.schedules)}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </b-list-group-item>
                </router-link>
            </template>
        </b-list-group>
        <loading v-model:active="isLoading" background-color="black" :can-cancel="false" :is-full-page="fullPage">
            <div class="text-center">
                <img src="@/assets/images/logo-sm.png" class="heartbeat-spin" style="width: 40px; height: auto;" alt="loading..." />
                <br /><br /><span class="text-white fw-semibold fs-10">Good things take time…</span>
            </div>
        </loading>
    </Layout>
</template>
<script>
import Loading from 'vue-loading-overlay';
import axios from 'axios';
import Pusher from 'pusher-js';
import Layout from "@/layouts/main.vue";
export default {
    components: { Layout, Loading },
    data(){
        return {
            lists: [],
            participant_id: this.$store.state.auth.user.data.id,
            load: false,
            isLoading: false,
            fullPage: true
        }
    },
    mounted() {
        this.initPusher();
    },
    created(){
        this.fetch();
    },
    methods: { 
        initPusher() {
            const pusher = new Pusher("dws2rpb0uczmrhwzmoya", {
                cluster: "mt1",                
                wsHost: "rstwhanda.dost9.ph",
                wsPort: 443,
                wssPort: 443,
                forceTLS: true,
                enabledTransports: ["ws", "wss"],
                disableStats: true,
                wsPath: "/ws"                
            });
            const channel = pusher.subscribe("session");
            channel.bind("App\\Events\\SessionEvent", (data) => {
                console.log("Maintenance event:", data);
                if (data.data.id != this.$store.state.auth.user.data.id) {
                    switch(data.type){
                        case 'status':
                            // this.session.status = data.data;
                        break;
                    }
                }
            });      
        },
        fetch(){
            this.load = false;
            this.isLoading = true;
            axios.get('/sessions',{ params : {id : this.participant_id}})
            .then(response => {
                if(response){
                    this.lists = response.data.data;     
                    this.load = true;
                }
                this.isLoading = false;
            })
            .catch(err => console.log(err));
        },
        dateRangeText(schedules) {
            let start = schedules[0].date;
            let end = schedules[0].date;

            schedules.forEach(s => {
                if (s.date < start) start = s.date;
                if (s.date > end) end = s.date;
            });

            const formatDate = (dateStr) => {
                const date = new Date(dateStr);
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            };

            return start === end
                ? formatDate(start)
                : `${formatDate(start)} - ${formatDate(end)}`;
        },
    }
};
</script>