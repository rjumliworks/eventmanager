<template>
    <footer class="footer p-2" v-if="showFooter">
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
                    <button class="btn btn-primary btn-md position-relative p-0 avatar-md rounded-circle"
                        style="margin-top: -55px;" type="button">
                        <div class="btn-content">
                            <span class="avatar-title bg-transparent text-reset">
                                <i class="fs-24 ri-qr-code-line"></i>
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
                <router-link to="/hotels" class="nav-link nav-icon">
                    <i class="fs-20 ri-hotel-line"></i>
                    <span class="nav-label">Hotels</span>
                </router-link>
            </li>
        </ul>
    </footer>
</template>

<script>
    export default {
        computed: {
            showFooter() {
                // return !/^\/session\/\d+$/.test(this.$route.path);
                // List of routes where footer should be hidden
                const hiddenRoutes = [
                    /^\/session\/\d+$/, // session details
                    /^\/exhibitor\/\d+$/,
                    // /^\/profile$/, 
                    /^\/information$/, // login page      // register page
                    /^\/profile\/\d+$/, // profile details
                    /^\/register$/,
                    /^\/security$/,
                ];

                // Return false if current path matches any hidden route
                return !hiddenRoutes.some(pattern => pattern.test(this.$route.path));
            },
        },
    }
</script>
<style scoped>
    .footer {
        height: 90px;
        left: 0;
        position: fixed;
        border-top: .1rem solid;
        border-color: #e4e2e2;
        z-index: 60;
    }

    .mobile-curved-header {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 20;
        width: 100%;
        height: 95px;
        background: linear-gradient(to bottom, #405189 0%, #2f3a58 100%);
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        z-index: 0;
        overflow: hidden;
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