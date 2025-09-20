<template>
    <div class="layout-wrapper landing ">
       
        <section class="section login-modal" id="space"  
            :style="isIos 
            ? { height: '220px', paddingTop: '100px' } 
            : { height: '170px' }">
            <BContainer>
                <img src="@/assets/images/dost.png" alt="" class="mb-3 me-1" style="width: 40px; height: 40px; margin-top: -40px">
                <div class="card" style="margin-bottom: -160px; height: 190px; z-index: 100;">
                    <div class="card-body d-flex flex-column justify-content-between p-0" style="height: 100%;">
                        <div class="flex-fill border-bottom">
                           <div class="d-flex align-items-center p-3 mb-n2">
                                <div class="avatar-sm me-3">
                                    <div class="avatar-title rounded bg-transparent">
                                        <img  class="avatar-sm rounded-circle material-shadow" :src="$store.state.auth.user.data.avatar" />
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <h5 class="mb-0 fs-13 fw-semibold text-uppercase text-primary"> {{ $store.state.auth.user.data.firstname}}  {{ $store.state.auth.user.data.lastname}}</h5>
                                    <p class="text-muted mb-0 fs-11">{{ $store.state.auth.user.data.email }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex-fill d-flex">

                            <div class="flex-fill border-end" style="width: 33.3%">
                                <div class="text-center position-relative d-inline-block chart-wrapper mt-2">
                                    <apexchart class="apex-charts" height="50" dir="ltr" :series="[calcPercent($store.state.data.points, total)]" :options="{ ...chartOptions }"></apexchart>
                                    <i class="ri-trophy-fill center-icon text-secondary"></i>
                                    <p class="mb-n2 mt-1 fs-11 text-primary fw-semibold">{{ $store.state.data.points }}</p>
                                    <span class="text-primary fw-semibold" style="font-size: 9px;">Points Collected</span>
                                </div>
                            </div>

                            <div class="flex-fill border-end" style="width: 33.3%">
                                <div class="text-center position-relative d-inline-block chart-wrapper  mt-2">
                                    <apexchart class="apex-charts" height="50" dir="ltr" :series="[calcPercent(visited, $store.state.data.exhibitors.length)]" :options="{ ...chartOptions }"></apexchart>
                                    <i class="ri-store-2-fill center-icon text-secondary"></i>
                                    <p class="mb-n2 mt-1 fs-11 text-primary fw-semibold">{{visited}} of {{ $store.state.data.exhibitors.length }}</p>
                                    <span class="text-primary fw-semibold" style="font-size: 9px;">Exhibit Visited</span>
                                </div>
                            </div>

                            <div class="flex-fill" style="width: 33.3%">
                                <div class="text-center position-relative d-inline-block chart-wrapper mt-2">
                                    <apexchart class="apex-charts" height="50" dir="ltr" :series="[calcPercent(attended, registered)]" :options="{ ...chartOptions }"></apexchart>
                                    <i class="ri-calendar-todo-fill center-icon text-secondary"></i>
                                    <p class="mb-n2 mt-1 fs-11 text-primary fw-semibold">{{ attended }} of {{ registered }}</p>
                                    <span class="text-primary fw-semibold" style="font-size: 9px;">Session Attended</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </BContainer>
        </section>

         <section class="section bg-light" id="plans" style="margin-top: 15px; height: 235px;">
            <BContainer>
               <BCard no-body class="bg-primary pattern mt-5">
                    <BCardBody class="p-4">
                        <img class="img-fluid" :src="require('@/assets/images/rstwhanda/banner.png')"/>
                    </BCardBody>
                </BCard>
                
            </BContainer>
        </section>

        <section class="section">
            <BContainer>
                <div class="card border shadow-none bg-white p-4 mt-n4 mb-n4">
                    <div class="d-flex justify-content-center gap-5 text-center">
                        <div>
                            <div class="avatar-sm flex-shrink-0 mx-auto">
                                <span class="avatar-title bg-light text-primary rounded-circle fs-3 material-shadow">
                                    <i class="ri-money-dollar-circle-fill align-middle" style="font-size: 30px;"></i>
                                </span>
                            </div>
                            <div class="mt-2 fw-semibold" style="font-size: 9px;">Points</div>
                        </div>
                        <div>
                            <div class="avatar-sm flex-shrink-0 mx-auto">
                                <span class="avatar-title bg-light text-success rounded-circle fs-3 material-shadow">
                                    <i class="ri-bank-card-fill align-middle"></i>
                                </span>
                            </div>
                            <div class="mt-2 fw-semibold" style="font-size: 9px;">Sessions</div>
                        </div>
                        <div>
                            <div class="avatar-sm flex-shrink-0 mx-auto">
                                <span class="avatar-title bg-light text-danger rounded-circle fs-3 material-shadow">
                                    <i class="ri-wallet-3-fill align-middle"></i>
                                </span>
                            </div>
                            <div class="mt-2 fw-semibold" style="font-size: 9px;">Exhibits</div>
                        </div>
                        <div>
                            <div class="avatar-sm flex-shrink-0 mx-auto">
                                <span class="avatar-title bg-light text-warning rounded-circle fs-3 material-shadow">
                                    <i class="ri-download-cloud-fill align-middle"></i>
                                </span>
                            </div>
                            <div class="mt-2 fw-semibold" style="font-size: 9px;">Materials</div>
                        </div>
                    </div>
                </div>

            </BContainer>
        </section>

        <section class="section bg-primary" id="reviews">
            <div class="bg-overlay bg-overlay-pattern2"></div>
            <BContainer>
                <BRow class="justify-content-center">
                    <BCol lg="10">
                        <div class="text-center">
                            <h4 class="text-white mb-3 fs-12"><span class="text-success">2025</span> RSTW & HANDA</h4>

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
                                                            <h5 class="text-white fs-12 mb-0">Regional Science, Technology, and Innovation Week</h5>
                                                            <p class="fs-11">RSTW</p>
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
                                                            <h5 class="text-white fs-12 mb-0">Handa Pilipinas sa Bagong Pilipinas</h5>
                                                            <p class="fs-11">Mindanao Leg</p>
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
            <BContainer>
                <BCardBody>
                    <BRow class="g-1 mt-n4 mb-3">
                        <BCol cols="6">
                            <img src="@/assets/images/nft/img-06.png" alt=""
                                class="img-fluid rounded">
                            <img src="https://img.themesbrand.com/velzon/images/img-2.gif" alt=""
                                class="img-fluid rounded mt-1">
                        </BCol>
                        <BCol cols="6">
                            <img src="https://img.themesbrand.com/velzon/images/img-5.gif" alt=""
                                class="img-fluid rounded mb-1">
                            <img src="@/assets/images/nft/img-03.jpg" alt=""
                                class="img-fluid rounded">
                        </BCol>
                    </BRow>
                </BCardBody>
                <hr class="text-muted"/>  
                <img src="@/assets/images/rstwhanda/rate.png" class="img-fluid rounded" style="height: auto; width: 100%; margin-bottom:-25px" alt="Responsive image">
            </BContainer>
        </section>

        <section class="section" style="height: 170px;">
            <BContainer>
                <div class="text-center mb-5 mt-n4">
                    <h3 class="mb-1 fw-semibold fs-12">Participating Agencies</h3>
                    <p class="text-muted mb-4 fs-10">Working together to bring innovation and progress.</p>

                    <div class="text-center mt-0 mb-n5">
                        <div class="trusted-client-slider mt-sm-5 mt-4 mb-sm-5 mb-4">
                            <swiper class="swiper responsive-swiper rounded gallery-light pb-4" :loop="true"
                                :autoplay="true" :modules="[Autoplay]" :slidesPerView="1" :spaceBetween="10"
                                :breakpoints="{ 640: { slidesPerView: 2, spaceBetween: 20 }, 768: { slidesPerView: 3, spaceBetween: 40 }, 1200: { slidesPerView: 4, spaceBetween: 50 }, }">
                                <swiper-slide>
                                    <div class="swiper-slide">
                                        <div class="client-images">
                                            <img src="@/assets/images/rstwhanda/logo/dost.png" alt="client-img"
                                                class="mx-auto img-fluid d-block">
                                        </div>
                                    </div>
                                </swiper-slide>

                                <swiper-slide>
                                    <div class="swiper-slide">
                                        <div class="client-images">
                                            <img src="@/assets/images/rstwhanda/logo/bagongpilipinas.png" alt="client-img"
                                                class="mx-auto img-fluid d-block">
                                        </div>
                                    </div>
                                </swiper-slide>

                                <swiper-slide>
                                    <div class="swiper-slide">
                                        <div class="client-images">
                                            <img src="@/assets/images/rstwhanda/logo/tapi.png" alt="client-img"
                                                class="mx-auto img-fluid d-block">
                                        </div>
                                    </div>
                                </swiper-slide>
                                <swiper-slide>
                                    <div class="swiper-slide">
                                        <div class="client-images">
                                            <img src="@/assets/images/rstwhanda/logo/phivolcs.png" alt="client-img"
                                                class="mx-auto img-fluid d-block">
                                        </div>
                                    </div>
                                </swiper-slide>
                                <swiper-slide>
                                    <div class="swiper-slide">
                                        <div class="client-images">
                                            <img src="@/assets/images/rstwhanda/logo/pagasa.png" alt="client-img"
                                                class="mx-auto img-fluid d-block">
                                        </div>
                                    </div>
                                </swiper-slide>
                                <swiper-slide>
                                    <div class="swiper-slide">
                                        <div class="client-images">
                                            <img src="@/assets/images/rstwhanda/logo/rrd.png" alt="client-img"
                                                class="mx-auto img-fluid d-block">
                                        </div>
                                    </div>
                                </swiper-slide>
                                 <swiper-slide>
                                    <div class="swiper-slide">
                                        <div class="client-images">
                                            <img src="@/assets/images/rstwhanda/logo/logos.png" alt="client-img"
                                                class="mx-auto img-fluid d-block">
                                        </div>
                                    </div>
                                </swiper-slide>

                            </swiper>
                        </div>
                    </div>
                </div>
            </BContainer>
        </section>

        <section class="py-5 bg-primary position-relative" style="margin-bottom: 80px">
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
                <router-link to="/" class="nav-link nav-icon">
                    <i class="fs-20 ri-home-wifi-line"></i>
                    <span class="nav-label">Home</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/sessions" class="nav-link nav-icon">
                    <i class="fs-20 ri-calendar-event-line"></i>
                    <span class="nav-label">Sessions</span>
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
                <router-link to="/exhibitors" class="nav-link nav-icon">
                    <i class="fs-20 ri-store-2-line"></i>
                    <span class="nav-label">Exhibitors</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/schedule" class="nav-link nav-icon">
                    <i class="fs-20 ri-calendar-2-line"></i>
                    <span class="nav-label">Schedule</span>
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
import { Capacitor } from '@capacitor/core';
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
            isIos: Capacitor.getPlatform() === 'ios',
            points: 0,      
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
    computed: {
        total() {
            const count = this.$store.state.data.exhibitors.length;
            return (count * 3) + (count * 2) + (count * 1); // commenting + visiting + voting
        },
        registered(){
            return this.$store.state.data.sessions.filter(
                s => s.has_registered === true
            ).length;
        },
        attended(){
            return this.$store.state.data.sessions.filter(
                s => s.has_attended === true
            ).length;
        },
        visited(){
            return this.$store.state.data.exhibitors.filter(
                s => s.has_visited === true
            ).length;
        }
    },
    components: { Swiper, SwiperSlide, Loading },
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
        }
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
    height: 90px;
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
  top: 28%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;  /* adjust icon size as needed */
  pointer-events: none; /* avoid interfering with chart hover */
}
.pattern{
    background-image: url('../assets/images/nft/bg-pattern.png');
}
.nav-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    /* optional, keeps label small */
}

.nav-label {
    font-size: 8px;
    margin-top: 0px;
    /* little gap between icon and text */
}
</style>
