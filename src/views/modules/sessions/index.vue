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
                            <div v-if="list.has_registered" class="ribbon-two ribbon-two-secondary" style="z-index:50;"><span style="font-size: 8px; ">Registered</span></div>
                            <div class="card-body">
                                <div class="d-flex flex-column h-100">
                                    <!-- <div class="d-flex">
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-4">Updated 3hrs ago</p>
                                        </div>
                                        <div class="flex-shrink-0">
                                            <div class="d-flex gap-1 align-items-center"><button
                                                    class="btn btn-md btn-transparent btn avatar-xs mt-n1 p-0 favourite-btn material-shadow-none"
                                                    type="button"><span class="avatar-title bg-transparent fs-15"><i
                                                            class="ri-star-fill"></i></span></button>
                                                <div class="btn-group"><button
                                                        class="btn btn-md btn-link btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15 material-shadow-none dropdown-toggle dropdown-toggle-no-caret"
                                                        type="button" id="__BVID__025989___BV_dropdown__" aria-expanded="false"
                                                        aria-haspopup="menu"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                            stroke-linecap="round" stroke-linejoin="round"
                                                            class="feather feather-more-horizontal icon-sm icon-sm">
                                                            <circle cx="12" cy="12" r="1"></circle>
                                                            <circle cx="19" cy="12" r="1"></circle>
                                                            <circle cx="5" cy="12" r="1"></circle>
                                                        </svg></button>
                                                    <ul style="position: absolute; left: 0px; top: 0px; display: none; transform: translate(430.667px, 238px); will-change: transform; max-height: 234.25px; max-width: 1258.83px;"
                                                        class="dropdown-menu show overflow-auto dropdown-menu-end"
                                                        aria-labelledby="__BVID__025989___BV_dropdown__" role="menu">
                                                        <li role="presentation"><a href="/velzon/vue/master/apps/projects-overview"
                                                                class="dropdown-item text-secondary" role="menuitem"><i
                                                                    class="ri-eye-fill align-bottom me-2 text-muted"></i> View</a></li>
                                                        <li role="presentation"><a href="/velzon/vue/master/apps/projects-create"
                                                                class="dropdown-item text-secondary" role="menuitem"><i
                                                                    class="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit </a></li>
                                                        <div class="dropdown-divider"></div>
                                                        <li role="presentation"><button class="dropdown-item text-secondary" role="menuitem"
                                                                type="button"><i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                Remove </button></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div> -->
                                    <div class="d-flex mb-n3">
                                        <div class="flex-shrink-0 me-3">
                                            <div class="avatar-sm">
                                                <span class="avatar-title bg-subtle rounded p-2 bg-warning-subtle">
                                                    <img src="@/assets/images/logo-sm.png" alt="" class="img-fluid p-1">
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1">
                                            <h5 class="mb-1 fs-12 fw-semibold text-primary">{{list.title}}</h5>
                                            <p class="text-muted fs-10 text-truncate-two-lines mb-3">{{list.detail.description}}</p>
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
            axios.get('/sessions',{ params : {id : this.participant_id}})
            .then(response => {
                if(response){
                    this.lists = response.data.data;     
                    this.load = true;
                }
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