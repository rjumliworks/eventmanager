<template>
    <Layout>
            <div class="bg-overlay bg-overlay-pattern opacity-50"></div>
            <b-container  class="position-relative text-center" style="z-index: 2;">
                <div class="d-flex flex-column align-items-center pt-0 pb-2">
                    <div class="avatar-border-wrapper mb-2">
                        <img :src="participant.avatar" alt="user-img" class="img-thumbnail rounded-circle avatar-lg" style="width: 80px; height: 80px; object-fit: cover; z-index: 3;" />
                    </div>
                    <div class="p-2">
                        <h4 class="fs-14 text-primary text-uppercase fw-bold mb-0"> {{ participant.firstname }} {{ participant.middlename }} {{ participant.lastname }}</h4>
                        <p class="fs-11 text-muted mb-0">{{ participant.email }}</p>
                        <p class="fs-11 text-muted">{{ participant.contact_no }}</p>
                    </div>
                    <img :src="participant.qr" class="img-fluid mt-2" style="width: 220px;" alt="QR Code" v-if="!showScanner" />
                    <button type="button" class="btn btn-soft-secondary rounded-pill btn-sm waves-effect material-shadow-none fs-10 mt-2">Enlarge QR <i class="ri-qr-code-line"></i></button>
                    <!-- Switch Button -->
                   

                    <!-- QR Scanner (if enabled) -->
                    <div v-if="showScanner" style="width: 250px; height: auto;" class="mt-2">
                        <div id="qr-reader" style="width: 100%; height: auto;"></div>
                    </div>

                    <b-form-group class="mt-4 fs-14">
                        <b-form-checkbox switch v-model="showScanner">
                            {{ showScanner ? 'Switch to My QR Code' : 'Switch to Scanner' }}
                        </b-form-checkbox>
                    </b-form-group>
                </div>
            </b-container>
            
    </Layout>
</template>
<script>
import axios from 'axios';
import Layout from "@/layouts/main.vue";
import { Html5Qrcode } from "html5-qrcode";
export default {
    components: { Layout },
    data(){
        return {
            participant: this.$store.state.auth.user.data,
            showScanner: false,
            qrScanner: null,
            session: null
        }
    },
    watch: {
        showScanner(newVal) {
            if (newVal) {
                this.startScanner();
            } else {
                this.stopScanner();
            }
        }
    },
    methods: { 
        async startScanner() {
            await this.$nextTick();
            const config = { fps: 10, qrbox: { width: 200, height: 200 } };

            // Helper to restart the scanner
            const restartScanner = async () => {
                try {
                    await this.qrScanner.start({ facingMode: "environment" }, config);
                } catch (e) {
                    console.error("Failed to restart scanner", e);
                }
            };

            this.qrScanner = new Html5Qrcode("qr-reader");

            try {
                await this.qrScanner.start(
                    { facingMode: "environment" },
                    config,
                    async (decodedText) => {
                        // Stop immediately to avoid duplicate reads
                        await this.qrScanner.stop();

                        try {
                            const response = await axios.post('/sessions/attendance', {
                                participant_id: this.participant.id,
                                session: decodedText
                            });

                            if (response.data.status) {
                                this.showScanner = false;  // ✅ success, keep stopped
                            } else {
                                // If backend says no, restart
                                await restartScanner();
                            }
                        } catch ({ response }) {
                            // Network / validation error → restart scanner
                            if (response?.status === 422) {
                                this.validationErrors = response.data.errors;
                            } else {
                                this.validationErrors = {};
                                this.error = response?.data?.message || 'Error occurred';
                            }
                            await restartScanner();      // 🔄 retry automatically
                        }
                    },
                    (errorMessage) => {
                        console.warn("QR Scan Error", errorMessage);
                    }
                );
            } catch (err) {
                console.error("Failed to start scanner", err);
            }
        },
        stopScanner() {
            if (this.qrScanner) {
                this.qrScanner.stop().then(() => {
                    this.qrScanner.clear();
                    this.qrScanner = null;
                }).catch(err => {
                    console.error("Failed to stop scanner", err);
                });
            }
        },
    },
    beforeUnmount() {
        this.stopScanner();
    },
};
</script>