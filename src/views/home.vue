<template>
    <div class="layout-wrapper landing ">
       
        <section class="section login-modal" style="height: 100px;">
            <BContainer>
                <div class="card" style="margin-bottom: -160px; height: 200px; z-index: 100;">
                    <div class="card-body d-flex flex-column justify-content-between p-0" style="height: 100%;">
                        <div class="flex-fill border-bottom">
                           <div class="d-flex align-items-center p-3 mb-n3">
                                <div class="avatar-sm me-3">
                                    <div class="avatar-title rounded bg-transparent">
                                        <img  class="avatar-sm rounded-circle material-shadow" :src="require('@/assets/images/avatars/avatar.jpg')" />
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <h5 class="mb-0 fs-14 fw-semibold text-uppercase text-primary"> {{ $store.state.auth.user.data.firstname}}  {{ $store.state.auth.user.data.lastname}}</h5>
                                    <p class="text-muted mb-0 fs-12">{{ $store.state.auth.user.data.email }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex-fill d-flex">
                            <div class="flex-fill border-end mt-2" style="width: 33.3%">
                                <div class="text-center position-relative d-inline-block chart-wrapper">
                                    <apexchart class="apex-charts" height="70" dir="ltr" :series="[calcPercent(points, selected.points)]" :options="{ ...chartOptions }"></apexchart>
                                    <i class="ri-trophy-fill center-icon text-secondary"></i>
                                    <span class="text-primary fw-semibold fs-10">Points Collected</span>
                                </div>
                            </div>

                            <div class="flex-fill border-end mt-2" style="width: 33.3%">
                                <div class="text-center position-relative d-inline-block chart-wrapper">
                                    <apexchart class="apex-charts" height="70" dir="ltr" :series="[calcPercent(sessions, selected.sessions)]" :options="{ ...chartOptions }"></apexchart>
                                    <i class="ri-calendar-todo-fill center-icon text-secondary"></i>
                                    <span class="text-primary fw-semibold fs-10">Session Attended</span>
                                </div>
                            </div>

                            <div class="flex-fill mt-2" style="width: 33.3%">
                                <div class="text-center position-relative d-inline-block chart-wrapper">
                                    <apexchart class="apex-charts" height="70" dir="ltr" :series="[calcPercent(exhibits, selected.exhibits)]" :options="{ ...chartOptions }"></apexchart>
                                    <i class="ri-store-2-fill center-icon text-secondary"></i>
                                    <span class="text-primary fw-semibold fs-10">Exhibit Visited</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </BContainer>
        </section>

        <section class="section bg-light" id="plans">
            <div class="bg-overlay bg-overlay-pattern"></div>
            <BContainer>
                <hr class="text-muted"/>
            </BContainer>
        </section>

        <section class="section">
            <BContainer></BContainer>
        </section>

        <section class="section bg-primary" id="reviews">
            <div class="bg-overlay bg-overlay-pattern2"></div>
            <BContainer>
                <BRow class="justify-content-center">
                    <BCol lg="10">
                        <div class="text-center">
                            <div>
                                <i class="ri-double-quotes-l text-success display-3"></i>
                            </div>
                            <h4 class="text-white mb-5"><span class="text-success">2025</span> RSTW & HANDA</h4>

                            <div class="client-review-swiper rounded">
                                <swiper class="navigation-swiper rounded" :loop="true"
                                    :modules="[Autoplay, Navigation, Pagination]"
                                    :autoplay="{ delay: 2500, disableOnInteraction: false }"
                                    :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
                                    :pagination="{ clickable: true, el: '.swiper-pagination' }">
                                    <swiper-slide>
                                        <div class="swiper-slide">
                                            <BRow class="justify-content-center">
                                                <BCol cols="8">
                                                    <div class="text-white-50">
                                                        <p class="fs-12 ff-secondary mb-4">"A flagship celebration showcasing how science, technology, and innovation (STI) empower communities and drive national progress. Aligned with the call “Handa Pilipinas sa Bagong Pilipinas,” RSTW promotes awareness, preparedness, and resilience through science-based solutions. It brings together researchers, innovators, local governments, and the public to highlight how STI can address regional challenges, support disaster readiness, improve livelihoods, and build a more inclusive, forward-looking nation."</p>

                                                        <div>
                                                            <h5 class="text-white">Regional Science, Technology, and Innovation Week</h5>
                                                            <p>RSTW</p>
                                                        </div>
                                                    </div>
                                                </BCol>
                                            </BRow>
                                        </div>
                                    </swiper-slide>

                                    <swiper-slide>
                                        <div class="swiper-slide">
                                            <BRow class="justify-content-center">
                                                <BCol cols="8">
                                                    <div class="text-white-50">
                                                        <p class="fs-12 ff-secondary mb-4">"A unified call to action for a more resilient, responsive, and forward-looking nation. Rooted in the spirit of preparedness and innovation, this movement embodies the collective efforts of government, communities, and individuals in building a safer, more progressive Philippines under the vision of "Bagong Pilipinas." It highlights proactive disaster risk reduction, good governance, sustainable development, and inclusive growth to ensure that every Filipino is ready for the challenges and opportunities of a new era."</p>

                                                        <div>
                                                            <h5 class="text-white">Handa Pilipinas sa Bagong Pilipinas</h5>
                                                            <p>Mindanao Leg</p>
                                                        </div>
                                                    </div>
                                                </BCol>
                                            </BRow>
                                        </div>
                                    </swiper-slide>
                                    <div class="swiper-button-next bg-white rounded-circle"></div>
                                    <div class="swiper-button-prev bg-white rounded-circle"></div>
                                    <div class="swiper-pagination position-relative mt-2"></div>
                                </swiper>
                            </div>

                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </section>

        <section class="py-5 position-relative bg-light">
            <BContainer></BContainer>
        </section>

        <section class="section">
            <BContainer></BContainer>
        </section>

        <section class="py-5 bg-primary position-relative">
            <div class="bg-overlay bg-overlay-pattern opacity-50"></div>
            <BContainer></BContainer>
        </section>

        
        <BButton variant="danger" @click="topFunction" class="btn-icon" id="back-to-top">
            <i class="ri-arrow-up-line"></i>
        </BButton>
    </div>
    <footer class="footer p-2">
        <ul class="nav nav-pills nav-justified card-footer-tabs">
            <li class="nav-item">
                <router-link to="/" class="nav-link">
                    <i class="fs-20 ri-home-wifi-line"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/sessions" class="nav-link">
                    <i class="fs-20 ri-calendar-event-line"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/qrcode" class="nav-link">
                    <button class="btn btn-primary btn-md position-relative p-0 avatar-md rounded-circle" style="margin-top: -55px;" type="button">
                        <div class="btn-content">
                            <span class="avatar-title bg-transparent text-reset">
                                <i class='fs-24 ri-qr-code-line'></i>
                            </span>
                        </div>
                    </button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/exhibitors" class="nav-link">
                    <i class="fs-20 ri-store-2-line"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/hotels" class="nav-link">
                    <i class='fs-20 ri-hotel-line'></i>
                </router-link>
            </li>
        </ul>
    </footer>
    <loading v-model:active="isLoading" background-color="black" :can-cancel="false" :is-full-page="fullPage">
        <div class="text-center">
            <img src="@/assets/images/logo-sm.png" class="heartbeat-spin" style="width: 40px; height: auto;" alt="loading..." />
            <br /><br /><span class="text-white fw-semibold fs-10">Good things take time…</span>
        </div>
    </loading>
</template>

<script>
import axios from 'axios';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import Loading from 'vue-loading-overlay';
import "swiper/css";
import "swiper/css/autoplay";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
    data() {
        return {
            points: 90,      
            sessions: 4,
            exhibits: 1,
            Autoplay, Navigation, Pagination,
            chartOptions: {
                chart: {
                    type: "radialBar",
                    sparkline: { enabled: true },
                },
                dataLabels: { enabled: false },
                plotOptions: {
                    radialBar: {
                        hollow: { margin: 0, size: "70%" },
                        track: { margin: 1 },
                        dataLabels: { show: false },
                    },
                },
                colors: ["#007aff"],
            },
            selected: {       // ✅ safe defaults
            points: 0,
            sessions: 0,
            exhibits: 0
            },
            isLoading: false
        };
    },
    components: { Swiper, SwiperSlide, Loading },
    created(){
        this.fetch();
    },
    methods: {
        calcPercent(value, max) {
            return Math.round((value / max) * 100);
        },
        topFunction() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        },
        fetch(){
            this.isLoading = true;
            axios.get('/dashboard',{ params : {participant_id : this.$store.state.auth.user.data.id}})
            .then(response => {
                if(response){
                    this.selected = response.data; 
                    console.log(this.selected);
                    this.isLoading = false;    
                }
            })
            .catch(err => console.log(err));
        },
    },
    unmounted() {
        window.removeEventListener('scroll', this.setActiveSection);
    },
    mounted() {
        window.addEventListener('scroll', this.setActiveSection);
        let backtoTop = document.getElementById("back-to-top");
        if (backtoTop) {
            window.onscroll = function () {
                if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                    backtoTop.style.display = "block";
                } else {
                    backtoTop.style.display = "none";
                }
            };
        }
        window.addEventListener('scroll', function (ev) {
            ev.preventDefault();
            var navbar = document.getElementById("navbar");
            if (navbar) {
                if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
                    navbar.classList.add("is-sticky");
                } else {
                    navbar.classList.remove("is-sticky");
                }
            }
        });
    },
};
</script>

<style scoped>
.stat-box {
  width: 100px;
  flex: 0 0 auto;
  padding: 0 5px;
}
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    border-top: 0.1rem solid #e4e2e2;
    background-color: #fff;
    z-index: 10;
}
/* ✅ Center icon inside ApexCharts */
.chart-wrapper {
  position: relative;
  display: inline-block;
}
.center-icon {
  position: absolute;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;  /* adjust icon size as needed */
  pointer-events: none; /* avoid interfering with chart hover */
}
</style>
