<template>
    <footer class="footer p-2">
        <ul class="nav nav-pills nav-justified card-footer-tabs">
            <li class="nav-item">
                <router-link to="/" class="nav-link">
                    <i class="fs-20 ri-home-3-fill"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/exhibitors" class="nav-link">
                    <i class="fs-20 ri-file-text-fill"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <Link href="/qrcode" class="nav-link">
                    <button class="btn btn-primary btn-md position-relative p-0 avatar-md rounded-circle" style="margin-top: -55px;" type="button">
                        <div class="btn-content">
                            <span class="avatar-title bg-transparent text-reset">
                                <i class='fs-24 ri-qr-code-line'></i>
                            </span>
                        </div>
                    </button>
                </Link>
            </li>
            <li class="nav-item">
                <router-link to="/sessions" class="nav-link">
                    <i class="fs-20 ri-calendar-fill"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/settings" class="nav-link">
                    <i class='fs-20 ri-settings-4-fill'></i>
                </router-link>
            </li>
        </ul>
    </footer>
</template>
<style scoped>
    .footer {
        left: 0;
        position: fixed;
        border-top: .1rem solid;
        border-color: #e4e2e2;
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
</style>
