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
            <div class="card-footer bg-transparent border-top-dashed py-2">
                <div class="fs-11">
                    <i class="ri-account-circle-fill text-success fs-14 me-2"></i>{{session.managers[0]?.user.profile.firstname}} {{session.managers[0]?.user.profile.lastname}}<br/>
                    <i class="ri-map-pin-fill text-danger fs-14 me-2"></i>{{session.venue.name}}, {{ session.venue.establishment }}<br/>
                    <i class="ri-calendar-event-fill text-info fs-14 me-2"></i>{{dateRangeText(session.schedules)}}
                </div>
                <!-- <div class="d-flex align-items-center fs-10">
                    <div class="flex-grow-1">
                        <i class="ri-map-pin-fill text-danger me-1"></i>{{session.venue.name}}, {{ session.venue.establishment }}
                        
                    </div>
                    <div class="flex-shrink-0">
                        <div><i class="ri-calendar-event-fill text-info me-1 align-bottom"></i>{{dateRangeText(session.schedules)}}</div>
                    </div>
                </div> -->
            </div>
        </div>

        <div class="card border shadow-none bg-white-subtle w-100 card-height-100" style="cursor: pointer;" @click="openCsf()">
            <div class="bg-white px-3 py-2 rounded-2 ">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <div class="fs-16 align-middle text-warning">
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-half-fill"></i>
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <h6 class="mb-0 fs-10">4.5 out of 5</h6>
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
                                    <div :key="index" class="tab-content mt-n2">
                                        <template v-if="menu == 'Activities'">
                                            <template v-for="(list,index) in session.activities" v-bind:key="index">  
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
                                                <b-list-group-item class="text-center" style="cursor: pointer;"  v-if="session.feedbackable.length == 0">
                                                    <span class="text-muted text-center fs-10">No comments found</span>
                                                </b-list-group-item>
                                                <b-list-group-item v-else v-for="(list,index) in session.feedbackable" v-bind:key="index" class="d-flex justify-content-between align-items-center ribbon-box right mt-1" style="cursor: pointer;" >
                                                    <div class="d-flex mb-n3">
                                                        <div class="flex-shrink-0">
                                                            <img :src="list.avatar" alt="" class="avatar-xs rounded-circle material-shadow">
                                                        </div>
                                                        <div class="flex-grow-1 ms-3">
                                                            <h5 class="fs-11">{{list.name}} <small class="text-muted ms-2">({{timeAgo(list.created_at)}})</small></h5>
                                                            <p class="text-muted fs-10">{{ list.comment }}</p>
                                                        </div>
                                                    </div>
                                                </b-list-group-item>
                                            </b-list-group>
                                        </template>

                                        <template v-if="menu == 'Questions'">
                                            <div class="col">
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
                                                            <img :src="list.avatar" alt="" class="avatar-xs rounded-circle material-shadow">
                                                        </div>
                                                        <div class="flex-grow-1 ms-3">
                                                            <h5 class="fs-10 mb-1">{{list.name}}<small class="text-muted ms-2">({{timeAgo(list.created_at)}})</small></h5>
                                                            <p class="text-muted fs-10">{{list.question}}</p>
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
    </Layout>
</template>
<script>
import axios from 'axios';
import Layout from "@/layouts/main.vue";
import Csf from './csf.vue';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default {
    components: { Layout, Csf },
    data(){
        return {
            session: {
                detail: {},
                venue: {},
                status: {},
                schedules: [],
                managers: [],
                activities: [],
                questions: [],
                feedbackable: []
            },
            form: {
                question: null,
                participant_id: this.$store.state.auth.user.data.id,
                session_id: this.$route.params.id,
            },
            question: null,
            menus: ['Activities','Comments','Questions'],
            now: dayjs()
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.now = dayjs(); 
        }, 60000);
    },
    beforeUnmount() {
        clearInterval(this.interval);
    },
    created(){
        this.fetch();
    },
    methods: { 
        fetch(){
            axios.get('/sessions/view/'+this.$route.params.id)
            .then(response => {
                if(response){
                    this.session = response.data.data;     
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
        openCsf(){
            this.$refs.csf.show();
        },
        timeAgo(date) {
            return dayjs(date).from(this.now);
        }
    }
};
</script>