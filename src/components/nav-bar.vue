<template>
    <header id="page-topbar">
        <div class="layout-width login-modal" :class="{ 'safe-area': isIos }">
            <div class="navbar-header">
                <div class="d-flex">
                    <div class="navbar-brand-box horizontal-logo">
                        <router-link to="/" class="logo logo-dark">
                            <span class="logo-sm">
                                <img src="@/assets/images/logo-sm.png" alt="" height="22" />
                            </span>
                            <span class="logo-lg">
                                <img src="@/assets/images/logo-dark.png" alt="" height="17" />
                            </span>
                        </router-link>

                        <router-link to="/" class="logo logo-light">
                            <span class="logo-sm">
                                <img src="@/assets/images/logo-sm.png" alt="" height="22" />
                            </span>
                            <span class="logo-lg">
                                <img src="@/assets/images/logo-light.png" alt="" height="17" />
                            </span>
                        </router-link>
                    </div>
                    <BButton v-if="showArrow" variant="white" class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger" id="topnav-hamburger-icon">
                        <span class="hamburger-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </BButton>
                    <BButton @click="goBack" v-else variant="white" class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn" >
                        <span class="ri-arrow-left-circle-line text-white fs-24">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </BButton>
                </div>

                <div class="d-flex align-items-center">
                    <BDropdown variant="link" class="ms-sm-3 header-item topbar-user" toggle-class="rounded-circle arrow-none" menu-class="dropdown-menu-end" :offset="{ alignmentAxis: -14, crossAxis: 0, mainAxis: 0 }">
                        <template #button-content>
                            <span class="d-flex align-items-center">
                                <img class="rounded-circle header-profile-user" :src="$store.state.auth.user.data.avatar"
                                    alt="Header Avatar">
                                <span class="text-start ms-xl-2">
                                    <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">Edward
                                        Diana</span>
                                    <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text">Founder</span>
                                </span>
                            </span>
                        </template>
                        <h6 v-if="$store.state.auth.user.data" class="dropdown-header fs-11">Welcome {{ $store.state.auth.user.data.firstname}}!</h6>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="mdi mdi-account-circle text-muted fs-14 align-middle me-1"></i>
                            <span class="align-middle fs-12"> Profile</span>
                        </router-link>
                        <a class="dropdown-item" href="#"><i
                                class="mdi mdi-lifebuoy text-muted fs-14 align-middle me-1"></i>
                            <span class="align-middle fs-12"> Help</span>
                        </a>
                        <div class="dropdown-divider"></div>

                        <a class="dropdown-item" href="#">
                            <i class="mdi mdi-cog-outline text-muted fs-14 align-middle me-1"></i>
                            <span class="align-middle fs-12"> Settings</span>
                        </a>

                        <a class="dropdown-item" @click="logout"><i
                                class="mdi mdi-logout text-muted fs-14 align-middle me-1"></i>
                            <span class="align-middle fs-12" data-key="t-logout"> Logout</span>
                        </a>
                    </BDropdown>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { layoutMethods } from "@/state/helpers";
import { mapActions} from 'vuex'
import { Capacitor } from '@capacitor/core'
export default {
     data() {
        return {
            isIos: Capacitor.getPlatform() === 'ios'
        }
    },
    methods: {
        ...layoutMethods,
        ...mapActions({
            signOut: "auth/logout"
        }),
        logout() {
            this.signOut();
            this.$router.push({
                name: "login"
            })
        },
        toggleHamburgerMenu() {
            var windowSize = document.documentElement.clientWidth;
            let layoutType = document.documentElement.getAttribute("data-layout");

            document.documentElement.setAttribute("data-sidebar-visibility", "show");
            let visiblilityType = document.documentElement.getAttribute("data-sidebar-visibility");

            if (windowSize > 767)
                document.querySelector(".hamburger-icon").classList.toggle("open");
            if(
                document.documentElement.getAttribute("data-layout") === "horizontal"
            ){
                document.body.classList.contains("menu") ?
                document.body.classList.remove("menu") :
                document.body.classList.add("menu");
            }
            if (visiblilityType === "show" && (layoutType === "vertical" || layoutType === "semibox")) {
                if (windowSize < 1025 && windowSize > 767) {
                    document.body.classList.remove("vertical-sidebar-enable");
                    document.documentElement.getAttribute("data-sidebar-size") == "sm" ?
                        document.documentElement.setAttribute("data-sidebar-size", "") :
                        document.documentElement.setAttribute("data-sidebar-size", "sm");
                } else if (windowSize > 1025) {
                    document.body.classList.remove("vertical-sidebar-enable");
                    document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
                        document.documentElement.setAttribute("data-sidebar-size", "sm") :
                        document.documentElement.setAttribute("data-sidebar-size", "lg");
                } else if (windowSize <= 767) {
                    document.body.classList.add("vertical-sidebar-enable");
                    document.documentElement.setAttribute("data-sidebar-size", "lg");
                }
            }

            if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
                document.body.classList.contains("twocolumn-panel") ?
                    document.body.classList.remove("twocolumn-panel") :
                    document.body.classList.add("twocolumn-panel");
            }
        },
        toggleMenu() {
            this.$parent.toggleMenu();
        },
        toggleRightSidebar() {
            this.$parent.toggleRightSidebar();
        },
        goBack() {
            this.$router.back(); 
        }
    },
    mounted() {
        document.addEventListener("scroll", function () {
            var pageTopbar = document.getElementById("page-topbar");
            if (pageTopbar) {
                document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar
                    .classList.add(
                        "topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
            }
        });
        if (document.getElementById("topnav-hamburger-icon"))
            document
            .getElementById("topnav-hamburger-icon")
            .addEventListener("click", this.toggleHamburgerMenu);
    },
    computed: {
        showArrow() {
            const hideArrowRoutes = [
                /^\/session\/\d+$/,   // session detail pages
                /^\/exhibitor\/\d+$/,   // session detail pages
                /^\/information$/,          // login page
                /^\/hotel\/\d+$/,   // session detail pages
            ];

            // If current route matches one of these → return true (show hamburger instead of arrow)
            return !hideArrowRoutes.some(pattern => pattern.test(this.$route.path));
        },
    }
};
</script>
<style>
.safe-area {
  /* Add safe area on iOS automatically */
  padding-top: calc(35px + env(safe-area-inset-top));
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);

  /* Fallback for older iOS */
  padding-top: calc(35px + constant(safe-area-inset-top));
}
</style>