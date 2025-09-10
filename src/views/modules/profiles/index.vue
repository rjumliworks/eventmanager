<template>
    <Layout>
        <div class="page-title-box" style=" border-top: 1px solid #e0e0e0; position: fixed; width: 100%; margin-top: -24px; z-index: 100;">
            <h6 class="fw-bold mb-0">Account Profile</h6>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active fs-10">Essential details related to your account profile.</li>
            </ol>
        </div>
        <br/><br/>
        <b-list-group class="list-group-fill-success mt-3">
            <BListGroupItem >
                <div class="text-center mt-3 mb-3">
                    <div class="profile-user position-relative d-inline-block mx-auto mb-3" @click="ClickImage()">
                        <img :src="imageUrl" class="rounded-circle avatar-lg img-thumbnail user-profile-image material-shadow">
                        <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                            <!-- <input id="profile-img-file-input" type="file" class="profile-img-file-input" @change="previewImage"/> -->
                            <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                                <span class="avatar-title rounded-circle bg-light text-body">
                                <i class="ri-camera-fill"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <h5 class="fs-13 mb-0">{{ $store.state.auth.user.data.firstname }} {{ $store.state.auth.user.data.lastname }}</h5>
                    <p class="text-muted fs-11 mb-0">{{ $store.state.auth.user.data.email }}</p>
                </div>
            </BListGroupItem>
            <!-- <router-link to="/information">
                <BListGroupItem href="#" class="list-group-item-action fs-11">
                    <i class="ri-apps-2-fill align-middle me-2"></i>Overview
                </BListGroupItem>
            </router-link> -->
            <router-link to="/information">
                <BListGroupItem href="#" class="list-group-item-action fs-11">
                    <i class="ri-profile-fill align-middle me-2"></i>Personal Information
                </BListGroupItem>
            </router-link>
            <BListGroupItem href="#" class="list-group-item-action fs-11">
                <i class="ri-shield-check-line align-middle me-2"></i>Password & Security
            </BListGroupItem>
            <BListGroupItem href="#" class="list-group-item-action fs-11">
                <i class="ri-shield-keyhole-fill align-middle me-2"></i>Authentication Logs
            </BListGroupItem>
            <BListGroupItem href="#" class="list-group-item-action fs-11">
                <i class="ri-history-line align-middle me-2"></i>Activity Logs
            </BListGroupItem>
        </b-list-group>
        
    </Layout>
</template>
<script>
import axios from 'axios';
import Layout from "@/layouts/main.vue";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
export default {
    components: { Layout },
    data(){
        return {
            lists: [],
            participant_id: this.$store.state.auth.user.data.id,
            load: false,
            imageUrl: '',
            render: false,
        }
    }, 
    methods: { 
        async ClickImage() {
            await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                source: CameraSource.Camera,
                resultType: CameraResultType.Base64,
                }).then((image) => {
                this.render = true;
                this.imageUrl = String(image.base64String)
                this.imageUrl = 'data:image/jpeg;base64,'+this.imageUrl;

                let data = new FormData()
                data.append('id', this.$store.state.auth.user.data.id);
                data.append('image', this.imageUrl)
                
                let config = {
                    header : {
                    'Content-Type' : 'multipart/form-data'
                    }
                }
                axios.post('/avatar',data,config).then(response => {
                    if (response.data.status) {
                        console.log('wew');
                    }
                }).catch(({response})=>{
                    if(response.status===422){
                        this.validationErrors = response.data.errors
                    }else{
                        this.validationErrors = {}
                        alert(response.data.message)
                    }
                }).finally(()=>{
                    
                })
            });
        },
    }
};
</script>