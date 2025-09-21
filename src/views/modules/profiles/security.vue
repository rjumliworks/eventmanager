<template>
    <Layout>
        <b-list-group class="list-group-fill-success mt-3">
            <BListGroupItem>
                <i v-if="!profile" class="ri-close-circle-fill text-danger float-end fs-20"></i>
                <i v-else class="ri-checkbox-circle-fill text-success float-end fs-20"></i>
                <p class="mt-2 mb-2 text-muted fs-10">Profile picture is missing. Upload a profile photo to continue.
                </p>
            </BListGroupItem>
            <BListGroupItem>
                <div class="text-center mt-3 mb-3">
                    <div class="profile-user position-relative d-inline-block mx-auto mb-3" @click="takePhoto()">
                        <img :src="photoPreview"
                            class="rounded-circle avatar-lg img-thumbnail user-profile-image material-shadow">
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
            <BListGroupItem>
                <div class="d-flex ">
                    <button type="button" @click="uploadPhoto()" class="btn w-100 btn-primary me-2">Save </button>
                    <button type="button" @click="clearPhoto()" class="btn w-100 btn-light me-2">Clear</button>
                    <div class="hstack gap-2 ">
                        <button type="button" @click="pickFromGallery" class="btn btn-success btn-icon waves-effect waves-light"><i class="ri-image-2-fill"></i></button>
                    </div>
                    <input ref="fileInput" type="file" accept="image/*" style="display:none" @change="onFilePicked" />
                </div>
            </BListGroupItem>
            <BListGroupItem>
                <i v-if="!signature" class="ri-close-circle-fill text-danger float-end fs-20"></i>
                <i v-else class="ri-checkbox-circle-fill text-success float-end fs-20"></i>
                <p class="mt-2 mb-2 text-muted fs-10">Signature required. Add your signature below.</p>
            </BListGroupItem>
            <BListGroupItem>
                <Vue3SignaturePad ref="signaturePad" :options="{ penColor: '#000', minWidth: 0.5 }"
                    style="background-color: white; width: 100%; height: 180px; border-radius: 10px; border: 2px dashed #cccccc;" />
            </BListGroupItem>
            <BListGroupItem>
                <div class="d-flex ">
                    <button type="button" @click="submitSignature()" class="btn w-100 btn-primary me-2">Save </button>
                    <button type="button" @click="clearPad" class="btn w-100 btn-light">Clear</button>
                </div>
            </BListGroupItem>
        </b-list-group>
        <footer class="footer p-2">
            <div class="p-3 mt-n1">
                <button @click="submit()" class="btn w-100 btn-label"
                    :class="(loading || !(signature && profile)) ? 'btn-light' : 'btn-success'"
                    :disabled="loading || !(signature && profile)">
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
                <img src="@/assets/images/logo-sm.png" class="heartbeat-spin" style="width: 40px; height: auto;"
                    alt="loading..." />
                <br /><br /><span class="text-white fw-semibold fs-10">Good things take time…</span>
            </div>
        </loading>
    </Layout>
</template>
<script>
    import axios from 'axios';
    import {
        mapActions
    } from 'vuex';
    import Layout from "@/layouts/main.vue";
    import Vue3SignaturePad from "vue3-signature-pad";
    import Loading from 'vue-loading-overlay';
    import {
        Camera,
        CameraResultType,
        CameraSource,
        CameraDirection
    } from '@capacitor/camera'
    import {
        Capacitor
    } from '@capacitor/core'
    export default {
        components: {
            Layout,
            Vue3SignaturePad,
            Loading
        },
        data() {
            return {
                lists: [],
                participant_id: this.$store.state.auth.user.id,
                load: false,
                imageUrl: '',
                render: false,
                profile: (this.$store.state.auth.user.avatar) ? true : false,
                signature: (this.$store.state.auth.user.signature) ? true : false,
                isLoading: false,
                photoPreview: null,
                lastPhotoSource: '', // camera | gallery | web
                cameraDirection: 'rear', // toggle front/rear
                lastPhotoUri: null,
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
                updateImg: 'auth/update'
            }),
            async takePhoto() {
                this.isLoading = true
                try {
                    if (!Camera || Capacitor.getPlatform() === 'web') {
                        this.$refs.fileInput.click()
                        this.lastPhotoSource = 'web'
                        this.isLoading = false
                        return
                    }

                    const photo = await Camera.getPhoto({
                        quality: 90,
                        allowEditing: false,
                        resultType: CameraResultType.Uri, // ✅ always URI
                        source: CameraSource.Camera,
                        direction: this.cameraDirection === 'rear' ?
                            CameraDirection.Rear :
                            CameraDirection.Front,
                    })

                    this.lastPhotoSource = 'camera'
                    this.photoPreview = photo.webPath
                    this.lastPhotoUri = photo.webPath
                } catch (err) {
                    console.error('takePhoto error', err)
                    if (Capacitor.getPlatform() === 'web') {
                        this.$refs.fileInput.click()
                        this.lastPhotoSource = 'web'
                    } else {
                        alert('Camera error: ' + (err ?.message || err))
                    }
                } finally {
                    this.isLoading = false
                }
            },
            async resizeImage(blob, size = 200) {
                return new Promise((resolve, reject) => {
                    const img = new Image()
                    img.onload = () => {
                        const canvas = document.createElement('canvas')
                        const ctx = canvas.getContext('2d')

                        // Always square canvas
                        canvas.width = size
                        canvas.height = size

                        // Crop: take the shorter side and center crop
                        const minSide = Math.min(img.width, img.height)
                        const sx = (img.width - minSide) / 2
                        const sy = (img.height - minSide) / 2

                        ctx.drawImage(
                            img,
                            sx, sy, minSide, minSide, // crop area from source
                            0, 0, size, size // draw into 200×200 canvas
                        )

                        canvas.toBlob(
                            (resizedBlob) => resolve(resizedBlob),
                            'image/png',
                            0.8 // compression quality (0–1)
                        )
                    }
                    img.onerror = (err) => reject(err)
                    img.src = URL.createObjectURL(blob)
                })
            },
            async pickFromGallery() {
                this.isLoading = true
                try {
                    if (!Camera || Capacitor.getPlatform() === 'web') {
                        this.$refs.fileInput.click()
                        this.lastPhotoSource = 'web'
                        this.isLoading = false
                        return
                    }

                    const photo = await Camera.getPhoto({
                        quality: 90,
                        allowEditing: false,
                        resultType: CameraResultType.Uri, // ✅ always URI
                        source: CameraSource.Photos,
                    })

                    this.lastPhotoSource = 'gallery'
                    this.photoPreview = photo.webPath
                    this.lastPhotoUri = photo.webPath
                } catch (err) {
                    console.error('pickFromGallery error', err)
                    if (Capacitor.getPlatform() === 'web') {
                        this.$refs.fileInput.click()
                        this.lastPhotoSource = 'web'
                    } else {
                        alert('Gallery error: ' + (err ?.message || err))
                    }
                } finally {
                    this.isLoading = false
                }
            },
            dataURLToBlob(dataurl) {
                const arr = dataurl.split(',')
                const mime = arr[0].match(/:(.*?);/)[1]
                const bstr = atob(arr[1])
                let n = bstr.length
                const u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new Blob([u8arr], {
                    type: mime
                })
            },

            async onFilePicked(e) {
                const file = e.target.files?.[0]
                if (!file) return
                this.lastPhotoSource = 'web'
                this.isLoading = true
                try {
                    const reader = new FileReader()
                    reader.onload = () => {
                        this.photoPreview = reader.result
                        this.lastPhotoUri = null // since it's local base64, not a URI
                        this.isLoading = false
                    }
                    reader.readAsDataURL(file)
                } catch (err) {
                    console.error(err)
                    this.isLoading = false
                } finally {
                    e.target.value = ''
                }
            },
            async uploadPhoto() {
                if (!this.lastPhotoUri && !this.photoPreview) {
                    alert('No photo to upload')
                    return
                }
                this.isLoading = true
                try {
                    let blob

                    if (this.lastPhotoUri) {
                        const response = await fetch(this.lastPhotoUri)
                        blob = await response.blob()
                    } else if (this.photoPreview ?.startsWith('data:')) {
                        blob = this.dataURLToBlob(this.photoPreview)
                    }

                    if (!blob) {
                        alert('Failed to prepare file for upload')
                        return
                    }

                    // ✅ compress/resize before upload
                    const resized = await this.resizeImage(blob, 200)
                    this.photoPreview = URL.createObjectURL(resized)

                    let data = new FormData();
                    data.append('id', this.$store.state.auth.user.data.id);
                    data.append('image', resized, 'avatar.jpg');
                    const response = await axios.post('/avatar', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    })
                    console.log('[UploadPhoto] Server response:', response.data)

                    if (response.data.status) {
                        this.profile = true
                        const newUrl = response.data.data
                        this.$store.commit('auth/updateAvatar', newUrl)
                        this.isLoading = false
                    }
                } catch (err) {
                    console.error('upload error', err)
                    alert('Upload failed: ' + (err ?.message || err))
                } finally {
                    this.isLoading = false
                }
            },
            clearPhoto() {
                this.photoPreview = null
                this.lastPhotoUri = null
                this.lastPhotoSource = ''
            },
            async submitSignature() {
                try {
                    this.isLoading = false;
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
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
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
            clearPad() {
                this.$refs.signaturePad.clearSignature ?.();
                this.$refs.signaturePad.clear ?.();
            },
            async submit() {
                this.status = true;
                await axios.post('completed', {
                        id: this.$store.state.auth.user.data.id
                    })
                    .then(response => {
                        if (response.data.status) {
                            this.$store.commit('auth/updateCompleted', response.data.data);
                            this.$router.push({
                                name: 'dashboard'
                            });
                        }
                    }).catch(({
                        response
                    }) => {
                        console.log(response);
                    });
            }
        }
    };
</script>
<style>
    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 90px;
        border-top: 0.1rem solid #e4e2e2;
        background-color: #fff;
        z-index: 10;
    }
</style>