<template>
    <Layout>
        <div class="page-title-box" style=" border-top: 1px solid #e0e0e0; position: fixed; width: 100%; margin-top: -24px; z-index: 100;">
            <h6 class="fw-bold mb-0">VIEW EXHIBITOR</h6>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active fs-10">Talks highlighting science, technology, and innovation.</li>
            </ol>
        </div>
        <br/><br/>
        <div class="card border shadow-none bg-white-subtle w-100 card-height-100 mb-2 mt-2">
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
                            <h5 class="mb-1 fs-12 fw-semibold text-primary">{{exhibitor.title}}</h5>
                            <p class="text-muted fs-10 mb-3">{{exhibitor.description}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="card-footer bg-transparent border-top-dashed py-2 mb-1">
                <div class="fs-11">
                    <i class="ri-account-circle-fill text-success fs-14 me-2"></i>{{session.managers[0]?.user.profile.firstname}} {{session.managers[0]?.user.profile.lastname}}<br/>
                    <i class="ri-map-pin-fill text-danger fs-14 me-2"></i>{{session.venue.name}}, {{ session.venue.establishment }}<br/>
                    <i class="ri-calendar-event-fill text-info fs-14 me-2"></i>{{dateRangeText(session.schedules)}}
                </div>
            </div> -->
        </div>

        <div class="card border shadow-none bg-white-subtle w-100 card-height-100" style="cursor: pointer;" @click="openCsf()">
            <div class="bg-white px-3 py-2 rounded-2 ">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <div class="fs-16 align-middle text-warning" v-if="!exhibitor.feedback">
                            <i class="ri-star-line"></i>
                            <i class="ri-star-line"></i>
                            <i class="ri-star-line"></i>
                            <i class="ri-star-line"></i>
                            <i class="ri-star-line"></i>
                        </div>
                        <div class="fs-16 align-middle text-warning" v-else>
                            <template v-for="i in 5" :key="i">
                                <i v-if="exhibitor.feedback && exhibitor.feedback.rate >= i" class="ri-star-fill"></i>
                                <i v-else-if="exhibitor.feedback && exhibitor.feedback.rate >= i - 0.5" class="ri-star-half-fill"></i>
                                <i v-else class="ri-star-line"></i>
                            </template>
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <h6 class="mb-0 fs-10">{{(exhibitor.feedback) ? exhibitor.feedback.rate : 0 }} out of 5</h6>
                    </div>
                </div>
            </div>
        </div>

        <div class="card border shadow-none bg-light-subtle w-100 card-height-100 mt-n3" style="margin-bottom: 50px;">
           <div class="card bg-white rounded-bottom shadow-none mb-0">
                <div class="step-arrow-nav mt-0">
                    <ul class="nav nav-pills nav-justified custom-nav" role="tablist">
                        <li class="nav-item" role="presentation" v-for="(menu, index) in menus" v-bind:key="index">
                            <button class="nav-link fs-10 p-3" :class="(index == 0) ? 'active' : ''" 
                                :id="menu+'-tab'" data-bs-toggle="pill" :data-bs-target="'#'+menu" 
                                type="button" role="tab" :aria-controls="menu" aria-selected="true">
                                {{menu}} {{ (index == 2) ? '('+session.questions.length+')' : ''}}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card-body bg-white rounded-bottom">
                <div class="tab-content">
                    <div class="tab-pane" :class="(index == 0) ? 'show active' : ''" :id="menu" role="tabpanel" :aria-labelledby="menu+'-tab'" v-for="(menu, index) in menus" v-bind:key="index">
                        
                        <div class="carousel-container">
                            <div class="carousel-content">
                                <transition mode="out-in">
                                    <div :key="index" class="tab-content mt-n2 mb-n2">
                                        <template v-if="menu == 'Activities'">
                                            
                                        </template>

                                        <template v-if="menu == 'Comments'">
                                            <b-list-group flush class="mt-n3" style="margin-left: -16px; margin-right: -16px;">
                                                <b-list-group-item class="text-center mt-1" style="cursor: pointer;"  v-if="exhibitor.feedbacks.length == 0">
                                                    <span class="text-muted text-center fs-10">No comments found</span>
                                                </b-list-group-item>
                                                <b-list-group-item v-else v-for="(list,index) in exhibitor.feedbacks" v-bind:key="index" class="d-flex justify-content-between align-items-center ribbon-box right mt-1" style="cursor: pointer;" >
                                                    <div class="d-flex mb-n3">
                                                        <div class="flex-shrink-0">
                                                           <img :src="list.avatar === 'avatar.jpg' 
                                                                        ? require('@/assets/images/avatars/avatar.jpg') 
                                                                        : `${list.avatar}`" class="avatar-xs rounded-circle material-shadow"/>
                                                        </div>
                                                        <div class="flex-grow-1 ms-3">
                                                            <h5 class="fs-11 mb-1">{{list.name}} <small class="text-muted ms-2">({{timeAgo(list.created_at)}})</small></h5>
                                                            <p class="text-muted fs-10">{{ list.comment }}</p>
                                                        </div>
                                                    </div>
                                                </b-list-group-item>
                                            </b-list-group>
                                        </template>

                                    </div>
                                </transition>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    
        <Csf ref="csf"/>
        <footer class="footer p-2">
             <div class="p-3 mt-n1">
                <div v-if="exhibitor.has_voted">
                    <div class="alert alert-warning alert-dismissible alert-label-icon label-arrow fs-12 mt-n1" role="alert">
                        <i class="ri-trophy-fill fs-20 bx-tada label-icon"></i><strong>Thank you!</strong> Your vote has been successfully submitted. 
                        <button @click="vote()" type="button" class="btn-close"></button>
                    </div>
                </div>
                <button v-else @click="vote()" class="btn w-100 btn-danger btn-label" :disabled="loading">
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <i class="ri-trophy-fill label-icon align-middle fs-16 me-2"></i>
                        </div>
                        <div class="flex-grow-1">
                            Vote Exhibitor
                        </div>
                    </div>
                </button>
            </div>
        </footer>
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
import Csf from './csf.vue';
import axios from 'axios';
import Layout from "@/layouts/main.vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Pusher from 'pusher-js';
dayjs.extend(relativeTime);
export default {
    components: { Layout, Csf, Loading },
    data(){
        return {
            exhibitor: {
                contact: {},
                feedback: {},
                feedbacks: []
            },
            form: {
                participant_id: this.$store.state.auth.user.data.id,
                exhibitor_id: this.$route.params.id
            },
            menus: ['Comments'],
            now: dayjs(),
            isLoading: false,
            fullPage: true,
            loading: false
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.now = dayjs(); 
        }, 60000);
        this.initPusher();
    },
    beforeUnmount() {
        clearInterval(this.interval);
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
            channel.bind("App\\Events\\ExhibitorEvent", (data) => {
                console.log("Maintenance event:", data);
                if (data.data.id != this.$store.state.auth.user.data.id) {
                    switch(data.type){
                        case 'review':
                            this.exhibitor.reviews.unshift(data.data);
                        break;
                    }
                }
            });      
        },
        fetch(){
            this.isLoading = true;
            axios.get('/exhibitors/view/'+this.$route.params.id,{ params : {participant_id : this.$store.state.auth.user.data.id}})
            .then(response => {
                if(response){
                    this.exhibitor = response.data.data;  
                    this.isLoading = false;   
                }
            })
            .catch(err => console.log(err));
        },
        async submit() {
            this.status = true;
            await axios.post('sessions/question', this.form)
            .then(response => {
                if (response.data.status) {
                    this.status = false;
                    this.session.questions.unshift(response.data.data);
                } 
            }).catch(({response})=>{
                if(response.status===422){
                    this.validationErrors = response.data.errors
                }else{
                    this.validationErrors = {};
                    this.error = response.data.message;
                }
                this.status = false;
            }).finally(()=>{
                this.processing = false
            });
        },
        dateRangeText(schedules) {
            let start = schedules[0]?.date;
            let end = schedules[0]?.date;

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
        vote(){
            this.loading = true;
            axios.post('/exhibitors/vote',{
                participant_id: this.form.participant_id,
                exhibitor_id: this.$route.params.id
            }).then(response => {
                this.exhibitor.has_voted = response.data.data;
                this.loading = false;
            }).catch(({response})=>{
                console.log(response);
            });
        },
        updateRegister(status){
            this.exhibitor.has_visited = status;
        },
        openCsf(){
            this.$refs.csf.show(this.$route.params.id,this.exhibitor.feedback);
        },
        timeAgo(date) {
            return dayjs(date).from(this.now);
        }
    }
};
</script>
<style>
 .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 80px;
        border-top: 0.1rem solid #e4e2e2;
        background-color: #fff;
        z-index: 10;
    }
</style>