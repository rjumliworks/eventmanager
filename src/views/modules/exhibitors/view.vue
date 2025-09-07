<template>
    <Layout>
        <div class="page-title-box" style=" border-top: 1px solid #e0e0e0; position: fixed; width: 100%; margin-top: -24px; z-index: 100;">
            <h6 class="fw-bold mb-0">VIEW EXHIBITOR</h6>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active fs-10">Talks highlighting science, technology, and innovation.</li>
            </ol>
        </div>
        <br/><br/>

        <!-- <div class="alert alert-secondary border-1 bg-body-light fade show material-shadow fs-10 text-center mt-1 mb-3" role="alert">
            STATUS : <strong class="text-uppercase">{{session.status.name}}</strong>
        </div> -->
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
                        <div class="fs-16 align-middle text-warning">
                            <i class="ri-star-line"></i>
                            <i class="ri-star-line"></i>
                            <i class="ri-star-line"></i>
                            <i class="ri-star-line"></i>
                            <i class="ri-star-line"></i>
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <h6 class="mb-0 fs-10">0 out of 5</h6>
                    </div>
                </div>
            </div>
        </div>
    
        <Csf ref="csf"/>
        <footer class="footer p-2">
             <div class="p-3 mt-n1">
                <!-- <button type="button" class="btn w-100 btn-danger waves-effect waves-light fs-11">Cancel Registration</button> -->
                <button class="btn w-100 btn-danger btn-label">
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
            <!-- <template v-if="session.status.name == 'Waiting' || session.status.name == 'Open'">
                <div class="p-3 mt-n1" v-if="!session.has_registered">
                    <button @click="openRegister()" type="button" class="btn w-100 btn-warning waves-effect waves-light fs-11">Register Now</button>
                </div>
                <div class="p-3 mt-n1" v-else>
                    <button @click="openCancel()" type="button" class="btn w-100 btn-danger waves-effect waves-light fs-11">Cancel Registration</button>
                </div>
            </template>
            <template v-else>
                
            </template> -->
        </footer>
    </Layout>
</template>
<script>
import Csf from './csf.vue';
import axios from 'axios';
import Layout from "@/layouts/main.vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default {
    components: { Layout, Csf },
    data(){
        return {
            exhibitor: {
                contact: {},
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
            axios.get('/exhibitors/view/'+this.$route.params.id,{ params : {participant_id : this.$store.state.auth.user.data.id}})
            .then(response => {
                if(response){
                    this.exhibitor = response.data.data;     
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
        updateRegister(status){
            this.exhibitor.has_visited = status;
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