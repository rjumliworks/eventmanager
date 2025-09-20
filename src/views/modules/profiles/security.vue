<template>
    <Layout>
        <b-list-group class="list-group-fill-success mt-3">
            <BListGroupItem >
                <i v-if="!profile" class="ri-close-circle-fill text-danger float-end fs-20"></i>
                <i v-else class="ri-checkbox-circle-fill text-success float-end fs-20"></i>
                <p class="mt-2 mb-2 text-muted fs-10">Profile picture is missing. Upload a profile photo to continue.</p>
            </BListGroupItem>
            <BListGroupItem >
                <div class="text-center mt-3 mb-3">
                    <div class="profile-user position-relative d-inline-block mx-auto mb-3" @click="ClickImage()">
                        <img :src="$store.state.auth.user.data.avatar" class="rounded-circle avatar-lg img-thumbnail user-profile-image material-shadow">
                        <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                            <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                                <span class="avatar-title rounded-circle bg-light text-body">
                                <i class="ri-camera-fill"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <h5 class="fs-13 mb-0">{{ user.firstname }} {{ user.lastname }}</h5>
                    <p class="text-muted fs-11 mb-0">{{ user.email }}</p>
                </div>
            </BListGroupItem>
            <BListGroupItem >
                <i v-if="!signature" class="ri-close-circle-fill text-danger float-end fs-20"></i>
                <i v-else class="ri-checkbox-circle-fill text-success float-end fs-20"></i>
                <p class="mt-2 mb-2 text-muted fs-10">Signature required. Add your signature below.</p>
            </BListGroupItem>
            <BListGroupItem >
                <Vue3SignaturePad ref="signaturePad" :options="{ penColor: '#000', minWidth: 0.5 }" style="background-color: white; width: 100%; height: 180px; border-radius: 10px; border: 2px dashed #cccccc;"/>
            </BListGroupItem>
            <BListGroupItem >
                 <div class="d-flex ">
                    <button type="button" @click="submitSignature()" class="btn w-100 btn-primary">Save </button>
                    <button type="button" @click="clearPad" class="btn w-100 btn-light">Clear</button>
                </div>
            </BListGroupItem>
        </b-list-group>
        <footer class="footer p-2">
             <div class="p-3 mt-n1">
                <button @click="submit()" class="btn w-100 btn-label" :class="(loading || !(signature && profile)) ? 'btn-light' : 'btn-success'" :disabled="loading || !(signature && profile)">
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <i class="ri-save-fill label-icon align-middle fs-16 me-2"></i>
                        </div>
                        <div class="flex-grow-1">
                            Mark as completed
                        </div>
                    </div>
                </button>
            </div>
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
import axios from 'axios';
import { mapActions } from 'vuex';
import Layout from "@/layouts/main.vue";
import Vue3SignaturePad from "vue3-signature-pad";
import Loading from 'vue-loading-overlay';
import { Camera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
export default {
    components: { Layout, Vue3SignaturePad, Loading },
    data(){
        return {
            lists: [],
            participant_id: this.$store.state.auth.user.id,
            load: false,
            imageUrl: '',
            render: false,
            profile: (this.$store.state.auth.user.avatar) ? true : false,
            signature: (this.$store.state.auth.user.signature) ? true : false,
            isLoading: false
        }
    }, 
    computed: {
        user() {
            return this.$store.state.auth.user?.data || null;
        }
    },
    mounted() {
        const sig = this.user.signature;
        if (sig && sig.startsWith("data:image")) {
            this.$nextTick(() => {
                this.$refs.signaturePad.fromDataURL(sig);
            });
        }
    },
    methods: { 
        ...mapActions({
            updateImg:'auth/update'
        }),
       async ClickImage() {
    const permissionStatus = await Camera.requestPermissions();
    if (permissionStatus.camera !== 'granted') {
        alert('Camera permission is required to take a photo.');
        return;
    }

    let photo;
    try {
        // Try first camera (usually rear)
        photo = await Camera.getPhoto({
            quality: 90,
            source: CameraSource.Camera,
            resultType: CameraResultType.Uri,
            direction: CameraDirection.Front
        });
    } catch (cameraError) {
        console.warn('First camera failed, trying alternate camera...', cameraError);
        try {
            // Try alternate camera if available (front camera)
            photo = await Camera.getPhoto({
                quality: 90,
                source: CameraSource.Camera,
                resultType: CameraResultType.Uri,
                direction: CameraDirection.Rear
            });
        } catch (altCameraError) {
            alert('Unable to take photo. Please try again.');
            console.error('Both cameras failed:', altCameraError);
            return;
        }
    }

    try {
        this.isLoading = true;
        const responseFetch = await fetch(photo.webPath);
        const blob = await responseFetch.blob();

        let data = new FormData();
        data.append('id', this.$store.state.auth.user.data.id);
        data.append('image', blob, 'avatar.jpg');

        const response = await axios.post('/avatar', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.status) {
            this.profile = true;
            const newUrl = response.data.data;
            this.$store.commit('auth/updateAvatar', newUrl); 
        } else {
            alert('Upload failed. Please try again.');
        }
    } catch (axiosError) {
        console.error('Error uploading image:', axiosError);
        alert(axiosError);
    } finally {
        this.isLoading = false;
    }
}
,
        async submitSignature() {
            try {
                this.isLoading = true;
                const pad = this.$refs.signaturePad;
                if (!pad) return;

                if (pad.isEmpty()) {
                    console.log('Please add your signature first.');
                    this.signature = false;
                    this.isLoading = false;
                    return;
                }

                const canvas = pad.$el.querySelector('canvas');
                if (!canvas) return;

                canvas.toBlob(async (blob) => {
                    if (!blob) {
                        console.log('Please add your signature first.');
                        return;
                    }

                    const formData = new FormData();
                    formData.append('id', this.$store.state.auth.user.data.id);
                    formData.append('signature', blob, 'signature.png');
                    await axios.post('/signature', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }).then(response => {
                        if (response.data.status) {
                            this.signature = true;
                            this.isLoading = false;
                            this.$store.commit('auth/updateSignature', response.data.data); 
                        }
                    });
                }, 'image/png'); 
            } catch (err) {
                console.error(err);
                console.log('Please add your signature first.');
            }
        },
        async submit() {
            this.status = true;
            await axios.post('completed',{
                id: this.$store.state.auth.user.data.id
            })
            .then(response => {
                if (response.data.status) {
                    this.$store.commit('auth/updateCompleted', response.data.data); 
                    this.$router.push({ name: 'dashboard' });
                } 
            }).catch(({response})=>{
                console.log(response);
            });
        },
        clearPad() {
            this.$refs.signaturePad.clearSignature?.();
            this.$refs.signaturePad.clear?.();
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