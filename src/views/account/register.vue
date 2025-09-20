<template>
    <div>
        <div class="modal-body login-modal p-5" :style="isIos ? { height: '120px' }  : ''">
            <h5 class="text-white fs-12 mb-1 mt-n1" :style="isIos ? { paddingTop: '40px' }  : ''">Registration Form</h5>
            <p class="text-white-50 fs-10 mb-n5">Please fill out the form carefully and accurate.</p>
        </div>

        <div class="modal-body p-4 mt-4">
            <form class="customform" v-if="!completed">
                <BRow class="g-3" style="margin-top: -35px;">
                    <div class="p-4 mt-1">
                        <div class="row g-2">
                            <div class="col-6 mt-1">
                                <label class="form-label">First Name</label>
                                <input id="name" v-model="form.firstname" type="text"  class="form-control" placeholder="Enter first name" style="background-color: white;" :class="{ 'is-invalid': validationErrors && validationErrors.firstname }" />
                            </div>
                            <div class="col-6 mt-1">
                                <label class="form-label">Middle Name</label>
                                <input id="name" v-model="form.middlename" type="text"  class="form-control" placeholder="Enter middle name" style="background-color: white;" :class="{ 'is-invalid': validationErrors && validationErrors.middlename }" />
                            </div>
                                <div class="col-6 mt-1">
                                <label class="form-label">Last Name</label>
                                <input id="name" v-model="form.lastname" type="text"  class="form-control" placeholder="Enter last name" style="background-color: white;" :class="{ 'is-invalid': validationErrors && validationErrors.lastname }" />
                            </div>
                            <div class="col-6 mt-1">
                                <label class="form-label">Suffix</label>
                                <input id="name" v-model="form.suffix" type="text"  class="form-control" placeholder="Enter designation" style="background-color: white;" />
                            </div>
                            <!-- <div class="col-12 mt-n1 mb-0">
                                <hr class="text-mtued"/>
                            </div> -->
                            <div class="col-12 mt-1 mb-0">
                                <label class="form-label">Email Address</label>
                                <input id="name" v-model="form.email" type="text"  class="form-control" placeholder="Please enter email" style="text-transform: lowercase; background-color: white;" :class="{ 'is-invalid': validationErrors && validationErrors.email }" />
                            </div>
                            <div class="col-12 mt-1 mb-0">
                                <label class="form-label">Contact no.</label>
                                <input id="contact" v-model="form.contact_no" type="text"  class="form-control" placeholder="Please enter contact no." style="text-transform: lowercase; background-color: white;" :class="{ 'is-invalid': validationErrors && validationErrors.contact_no }" />
                            </div>
                            <div class="col-6 mt-1 mb-0">
                                <label class="form-label">Birthdate</label>
                                <input id="date" v-model="form.birthdate" type="date"  class="form-control" placeholder="Please enter contact no." style="background-color: white;"  :class="{ 'is-invalid': validationErrors && validationErrors.birthdate }" />
                            </div>
                            <div class="col-6 mt-1 mb-0">
                                <label>Sex</label>
                                <Multiselect :options="['Male','Female']" label="name" v-model="form.sex" ref="test" placeholder="Select Sex"/>
                            </div>
                            <div class="col-12 mt-1">
                                <label class="form-label">Affiliation</label>
                                <input id="name" v-model="form.affiliation" type="text"  class="form-control" placeholder="Enter affiliation" style="background-color: white;" :class="{ 'is-invalid': validationErrors && validationErrors.affiliation }" />
                            </div>
                            <div class="col-12 mt-1">
                                <label class="form-label">Designation</label>
                                <input id="name" v-model="form.designation" type="text"  class="form-control" placeholder="Enter designation" style="background-color: white;"
                                :class="{ 'is-invalid': validationErrors && validationErrors.designation }" />
                            </div>
                            <div class="col-12 mb-2">
                                <!-- <div class="signin-other-title text-white text-center"></div> -->
                            </div>
                        </div>
                        <div class="mt-4">
                           
                        </div>
                    </div>
                </BRow>
            </form>
            <div v-else>
                <div class="mt-2 text-center">
                    <lottie trigger="hover" :options="defaultOptions5" :height="150" :width="150" />

                    <h4 class="mb-3 mt-4 fs-18">
                        Registration Successful!
                    </h4>
                    <p class="text-muted fs-13 mb-4">
                        Thank you for registering. Your account has been created successfully and you can now participate in the event.  
                    </p>
                    <div class="hstack gap-2 justify-content-center">
                        <router-link to="/login"><BButton variant="primary">Login Here</BButton></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer class="footer p-2" v-if="!completed">
        <div class="p-3 mt-0">
            <BButton variant="primary" class="w-100 mt-n1" type="button" @click="submit" :disabled="sub">Submit</BButton>
            <router-link to="/login">
                <BButton variant="white" class="w-100 mt-2 bg-primary-subtle" type="button">Login</BButton>
            </router-link>
        </div>
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
    import Loading from 'vue-loading-overlay';
    import Lottie from "@/components/widgets/lottie.vue";
    import axios from 'axios';
    import Multiselect from "@vueform/multiselect";
    import "@vueform/multiselect/themes/default.css";
    import animationData5 from "@/components/widgets/tqywkdcz.json";
    export default {
        components: { Multiselect, lottie: Lottie, Loading },
        data() {
            return {
                isIos: Capacitor.getPlatform() === 'ios',
                form: {
                    firstname: null,
                    middlename: null,
                    lastname: null,
                    suffix: null,
                    email: null,
                    contact_no: null,
                    birthdate: null,
                    sex: null,
                    affiliation: null,
                    designation: null
                },
                defaultOptions5: {
                    animationData: animationData5
                },
                sub: false,
                showModal: false,
                completed: false,
                validationErrors:{},
                error: '',
                isLoading: false,
                fullPage: true
            }
        },
        methods: {
            async submit() {
                this.sub = true;
                this.isLoading = true;
                await axios.post('register', this.form).then(response => {
                    if (response.data.status) {
                        this.sub = false;
                        this.completed = true;
                    } 
                    this.isLoading = false;
                }).catch(({response})=>{
                    if(response.status===422){
                        this.validationErrors = response.data.errors
                    }else{
                        this.validationErrors = {};
                        this.error = response.data.message;
                    }
                    this.sub = false;
                    this.isLoading = false;
                }).finally(()=>{
                    this.processing = false
                });
            },
            hide() {
                this.showModal = false;
            },
        }
    }
</script>
<style>
input::placeholder {
  font-size: 11px;  /* set placeholder size */
  color: #999;      /* optional: placeholder color */
}
.multiselect-placeholder {
  font-size: 11px;   /* adjust size */
  color: #999;       /* optional */
}
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 125px;
    border-top: 0.1rem solid #e4e2e2;
    background-color: #fff;
    z-index: 10;
}
</style>