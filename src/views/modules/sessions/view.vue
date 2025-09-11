<template>
    <Layout>
        <div class="page-title-box" style=" border-top: 1px solid #e0e0e0; position: fixed; width: 100%; margin-top: -24px; z-index: 100;">
            <h6 class="fw-bold mb-0">VIEW SESSION</h6>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active fs-10">Talks highlighting science, technology, and innovation.</li>
            </ol>
        </div>
        <br/><br/>

        <div class="alert alert-secondary border-1 bg-body-light fade show material-shadow fs-10 text-center mt-1 mb-3" role="alert">
            STATUS : <strong class="text-uppercase">{{session.status.name}}</strong>
        </div>
        <div class="card border shadow-none bg-white-subtle w-100 card-height-100 mb-2 mt-2">
            <div class="card-body">
                <div class="d-flex flex-column h-100">
                    <div class="d-flex mb-n3">
                        <div class="flex-shrink-0 me-3">
                            <div class="avatar-sm">
                                <span class="avatar-title bg-subtle rounded p-2 bg-warning-subtle">
                                    <img src="@/assets/images/logo-sm.png" alt="" class="img-fluid p-1">
                                </span>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <h5 class="mb-1 fs-12 fw-semibold text-primary">{{session.title}}</h5>
                            <p class="text-muted fs-10 text-truncate-two-lines mb-3">{{session.detail.description}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-transparent border-top-dashed py-2 mb-1">
                <div class="fs-11">
                    <i class="ri-account-circle-fill text-success fs-14 me-2"></i>{{session.managers[0]?.user.profile.firstname}} {{session.managers[0]?.user.profile.lastname}}<br/>
                    <i class="ri-map-pin-fill text-danger fs-14 me-2"></i>{{session.venue.name}}, {{ session.venue.establishment }}<br/>
                    <i class="ri-calendar-event-fill text-info fs-14 me-2"></i>{{dateRangeText(session.schedules)}}
                </div>
            </div>
        </div>

        <div class="card border shadow-none bg-white-subtle w-100 card-height-100" style="cursor: pointer;" @click="openCsf()">
            <div class="bg-white px-3 py-2 rounded-2 ">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <div class="fs-16 align-middle text-warning" v-if="!session.feedback">
                            <i class="ri-star-line"></i>
                            <i class="ri-star-line"></i>
                            <i class="ri-star-line"></i>
                            <i class="ri-star-line"></i>
                            <i class="ri-star-line"></i>
                        </div>
                        <div class="fs-16 align-middle text-warning" v-else>
                            <template v-for="i in 5" :key="i">
                                <i v-if="session.feedback && session.feedback.rate >= i" class="ri-star-fill"></i>
                                <i v-else-if="session.feedback && session.feedback.rate >= i - 0.5" class="ri-star-half-fill"></i>
                                <i v-else class="ri-star-line"></i>
                            </template>
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <h6 class="mb-0 fs-10">{{(session.feedback) ? session.feedback.rate : 0 }} out of 5</h6>
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
                                {{menu}} 
                                {{ (index == 2) ? (session.questions.length > 0) ? '('+session.questions.length+')' : '' : ''}} 
                                {{ (index == 1) ? (session.feedbacks.length > 0) ? '('+session.feedbacks.length+')' : '' : ''}}
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
                                            <b-list-group-item class="text-center mt-1" style="cursor: pointer;"  v-if="session.activities.length == 0">
                                                <span class="text-muted text-center fs-10">No activities added</span>
                                            </b-list-group-item>
                                            <template v-else v-for="(list,index) in session.activities" v-bind:key="index">  
                                                <div class="card border shadow-none bg-light-subtle w-100 card-height-100 mb-2 mt-2">
                                                    <div v-if="list.has_registered" class="ribbon-two ribbon-two-secondary" style="z-index:50;"><span style="font-size: 9px; ">Registered</span></div>
                                                    <div class="card-body">
                                                        <div class="d-flex flex-column h-100">
                                                            <div class="d-flex mb-n4">
                                                                <div class="flex-grow-1">
                                                                    <h5 class="mb-3 fs-10 fw-semibold text-primary">{{list.activity}}</h5>
                                                                    <!-- <p class="text-muted fs-10 text-truncate-two-lines mb-3">{{list.speaker.name}}</p> -->
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card-footer bg-transparent border-top-dashed py-2">
                                                        <div class="d-flex align-items-center fs-10">
                                                            <div class="flex-grow-1">
                                                                <i class="ri-account-circle-fill fs-14 text-warning me-1"></i>{{list.speaker.name}}
                                                            </div>
                                                            <div class="flex-shrink-0">
                                                                <i class="ri-alarm-fill fs-14 text-success me-1"></i>{{list.start_time }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                        </template>

                                        <template v-if="menu == 'Comments'">
                                            <b-list-group flush class="mt-n3" style="margin-left: -16px; margin-right: -16px;">
                                                <b-list-group-item class="text-center mt-1" style="cursor: pointer;"  v-if="session.feedbacks.length == 0">
                                                    <span class="text-muted text-center fs-10">No comments found</span>
                                                </b-list-group-item>
                                                <b-list-group-item v-else v-for="(list,index) in session.feedbacks" v-bind:key="index" class="d-flex justify-content-between align-items-center ribbon-box right mt-1" style="cursor: pointer;" >
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

                                        <template v-if="menu == 'Questions'">
                                            <template v-if="session.status.name == 'Ongoing' || session.status.name == 'Closed'">
                                                <div class="col mt-2">
                                                    <input type="text" v-model="form.question" class="form-control form-control-sm chat-input bg-light border-light" 
                                                    style="font-size: 10px;" id="chat-input" 
                                                    placeholder="Ask your questions..." 
                                                    @keyup.enter="submit"
                                                    autocomplete="off">
                                                </div>
                                                <hr class="text-muted mb-1" style="margin-left: -16px; margin-right: -16px;"/>
                                                <b-list-group flush class="mt-0" style="margin-left: -16px; margin-right: -16px;">
                                                    <b-list-group-item class="text-center" style="cursor: pointer;" v-if="session.questions.length == 0">
                                                        <span class="text-muted text-center fs-10">No questions asked</span>
                                                    </b-list-group-item>
                                                    <b-list-group-item v-else v-for="(list,index) in session.questions" v-bind:key="index" class="d-flex justify-content-between align-items-center ribbon-box right mt-1" style="cursor: pointer;" >
                                                        <div class="d-flex mb-n3">
                                                            <div class="flex-shrink-0">
                                                                <img :src="list.avatar === 'avatar.jpg' 
                                                                        ? require('@/assets/images/avatars/avatar.jpg') 
                                                                        : `${list.avatar}`" class="avatar-xs rounded-circle material-shadow"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h5 class="fs-10 mb-1">{{list.name}}<small class="text-muted ms-2">({{timeAgo(list.created_at)}})</small></h5>
                                                                <p class="text-muted fs-10">{{list.question}}</p>
                                                            </div>
                                                        </div>
                                                    </b-list-group-item>
                                                </b-list-group>
                                            </template>
                                            <template v-else>
                                                <div class="alert alert-danger mb-xl-0 text-center material-shadow fs-10 mt-2" role="alert">
                                                    Questioning is still closed.
                                                </div>
                                            </template>
                                        </template>

                                    </div>
                                </transition>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <Csf @success="updateFeedback" ref="csf"/>
        <Cancel @cancel="updateRegister" ref="cancel"/>
        <Register @success="updateRegister" ref="register"/>
        <footer class="footer p-2">
            <template v-if="session.status.name == 'Waiting'">
                <div class="p-3 mt-n1" v-if="!session.has_registered">
                    <button class="btn w-100 btn-outline-danger  waves-effect waves-light fs-11" type="button" disabled>Registration is still closed</button>
                </div>
            </template>
            <template v-else-if="session.status.name == 'Open'">
                <div class="p-3 mt-n1" v-if="!session.has_registered">
                    <button @click="openRegister()" type="button" class="btn w-100 btn-warning waves-effect waves-light fs-11">Register Now</button>
                </div>
                <div class="p-3 mt-n1" v-else>
                    <button @click="openCancel()" type="button" class="btn w-100 btn-danger waves-effect waves-light fs-11">Cancel Registration</button>
                </div>
            </template>
            <template v-else-if="session.status.name == 'Ongoing'">
                <div class="d-flex mb-n3">
                    <div class="flex-shrink-0 me-3 ms-3 mt-2">
                        <div style="height:2.5rem;width:2.5rem;">
                           <lottie trigger="hover" :options="defaultOptions5" :height="50" :width="50" />
                        </div>
                    </div>
                    <div class="flex-grow-1 mt-3">
                        <h5 class="mb-0 fs-12"><span class="text-body">Explore, Learn, and Innovate</span></h5>
                        <p v-if="session.has_registered" class="text-muted text-truncate-two-lines fs-10">This session is currently ongoing.</p>
                        <p v-else class="text-muted text-truncate-two-lines fs-10">You are not registered for this session.</p>
                    </div>
                </div>
            </template>
            <template v-else>
                <!-- <lottie trigger="hover" :options="defaultOptions5" :height="50" :width="50" /> Thank you for attending the session -->
                <div class="d-flex mb-n3">
                    <div class="flex-shrink-0 me-3 ms-3 mt-2">
                        <div style="height:2.5rem;width:2.5rem;">
                           <lottie trigger="hover" :options="defaultOptions5" :height="50" :width="50" />
                        </div>
                    </div>
                    <div class="flex-grow-1 mt-3">
                        <h5 class="mb-0 fs-12"><span class="text-body">Explore, Learn, and Innovate</span></h5>
                        <p v-if="session.has_registered" class="text-muted text-truncate-two-lines fs-10">Thank you for attending the session.</p>
                        <p v-else class="text-muted text-truncate-two-lines fs-10">Thank you for viewing the session.</p>
                    </div>
                </div>
            </template>
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
import axios from 'axios';
import Layout from "@/layouts/main.vue";
import Csf from './csf.vue';
import dayjs from "dayjs";
import Cancel from './cancel.vue';
import Register from './register.vue';
import relativeTime from "dayjs/plugin/relativeTime";
import Pusher from 'pusher-js';
import Lottie from "@/components/widgets/lottie.vue";
import animationData5 from "@/components/widgets/tqywkdcz.json";
dayjs.extend(relativeTime);
export default {
    components: { Layout, Csf, Register, Cancel, lottie: Lottie, Loading },
    data(){
        return {
            session: {
                detail: {},
                venue: {},
                status: {},
                feedback: {},
                schedules: [],
                managers: [],
                activities: [],
                questions: [],
                feedbacks: []
            },
            form: {
                question: null,
                participant_id: this.$store.state.auth.user.data.id,
                session_id: this.$route.params.id,
            },
            question: null,
            menus: ['Activities','Comments','Questions'],
            now: dayjs(),
            defaultOptions5: {
                animationData: animationData5
            },
            isLoading: false,
            fullPage: true
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
            channel.bind("App\\Events\\SessionEvent", (data) => {
                console.log("Maintenance event:", data);
                if (data.data.id != this.$store.state.auth.user.data.id) {
                    switch(data.type){
                        case 'question':
                            if(this.session.id == data.data.session_id){
                                this.session.questions.unshift(data.data);
                            }
                        break;
                        case 'rating':
                            if(this.session.id == data.data.session_id){
                                this.session.feedbacks.unshift(data.data);
                            }
                        break;
                        case 'status':
                            if(this.session.id == data.data.id){
                                this.session.status = data.data.status;
                            }
                        break;
                    }
                }
            });      
        },
        fetch(){
            this.isLoading = true;
            axios.get('/sessions/view/'+this.$route.params.id,{ params : {participant_id : this.$store.state.auth.user.data.id}})
            .then(response => {
                if(response){
                    this.session = response.data.data; 
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
                    this.form.question = null;
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
        openRegister(){
            this.$refs.register.show(this.session.id,this.$store.state.auth.user.data.id);
        },
        openCancel(){
            this.$refs.cancel.show(this.session.id,this.$store.state.auth.user.data.id);
        },
        openCsf(){
            (this.session.feedback) ? '' : this.$refs.csf.show(this.$route.params.id,this.session.status);
        },
        updateRegister(status){
            this.session.has_registered = status;
        },
        updateFeedback(data){
            this.session.feedback = data;
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