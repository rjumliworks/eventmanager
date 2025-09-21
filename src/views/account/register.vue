<template>
    <div>
        <div class="modal-body login-modal p-5" :style="isIos ? { height: '120px' }  : ''">
            <h5 class="text-white fs-12 mb-1 mt-n3" :style="isIos ? { paddingTop: '40px' }  : ''">Registration Form</h5>
            <p class="text-white-50 fs-10 mb-n5">Please fill out the form carefully and accurate.</p>
        </div>

        <div class="modal-body p-4 mt-4">
            <form class="customform" v-if="!completed">
                <BRow class="g-3" style="margin-top: -35px; margin-bottom: 100px;">
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
                            <BCol lg="12"><hr class="text-muted mt-2"/></BCol>
                                <BCol lg="12" class="mt-0 mb-n1">
                                    <div class="d-flex">
                                        <div class="flex-grow-1 ms-0">
                                            <p class="fs-11 mb-0 text-muted">Please check if applicable</p>
                                        </div>
                                        <div class="flex-shrink-0 text-end">
                                                <div class="d-flex justify-content-center float-end fs-10">
                                                <b-form-checkbox v-model="form.is_4ps" name="is_4ps" class="mx-2">4PS</b-form-checkbox>
                                                <b-form-checkbox v-model="form.is_pwd" name="is_pwd" class="mx-2">PWD</b-form-checkbox>
                                                <b-form-checkbox v-model="form.is_ip" name="is_ip" class="mx-2">IP</b-form-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol lg="12"><hr class="text-muted mt-2"/></BCol>
                                <BCol lg="12" class="mb-3 mt-n1">
                                    <b-form-checkbox v-model="is_agree" name="is_agree">
                                        <a @click="openConsentForm()" class="text-info fs-10">Consent Form
                                            <span class="text-muted fs-10">(Please read and check this consent form to proceed)</span>
                                        </a>
                                    </b-form-checkbox>
                                </BCol>
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
            <BButton variant="primary" class="w-100 mt-n1" type="button" @click="submit" :disabled="!is_agree">Submit</BButton>
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
    </loading><b-modal v-model="formConsent" hide-footer class="v-modal-custom" size="lg" modal-class="zoomIn" body-class="p-0" centered hide-header-close style="z-index: 5000;">
        <div class="px-5 pt-2">
  <div>
    <h5 class="mb-1 mt-4 fs-11 text-center mb-3">CONSENT FORM</h5>

    <p class="fs-10 fw-bold">
      I, whose name and signature appear on this platform, hereby expressly agree, consent, and authorize DOST IX to collect and process the following personal information related to me:
    </p>
    <ul class="number-list fs-10">
      <li>Name</li>
      <li>Agency/Firm Address</li>
      <li>Designation/Position</li>
      <li>Contact Nos.</li>
      <li>Email Address</li>
      <li>Sex</li>
      <li>Birthday/Age</li>
      <li>4Ps/PWD/IP</li>
      <li>Photos taken during the conduct of meetings/trainings</li>
    </ul>

    <p class="fs-10 fw-bold">
      I agree that the above-mentioned personal information shall be processed for the following purposes:
    </p>
    <ul class="number-list fs-10">
      <li>Generation of Directory of Participants</li>
      <li>Issuance of Certificates</li>
      <li>Conduct of Impact Assessments</li>
      <li>Upload of pictures to DOST IX Website and Facebook Page</li>
      <li>Documents for Annual Reports and other publications</li>
      <li>Issuance of Billing Statements</li>
    </ul>

    <p class="fs-10 fw-bold">
      I agree that the above-mentioned personal information shall be processed in the following manner:
    </p>
    <ul class="number-list fs-10">
      <li>Storage in a database</li>
      <li>Storage in filing cabinets</li>
      <li>Storage on computer files</li>
    </ul>

    <p class="fs-10 fw-bold">
      I agree that the above-mentioned personal information may be disclosed to the following recipients for the following purposes:
    </p>
    <ul class="number-list fs-10">
      <li>Recipient – Authorized DOST IX personnel</li>
      <li>Purpose – For documentation</li>
    </ul>

    <p class="fs-10 fw-bold">
      I agree that the above-mentioned personal information will be retained or stored for as long as the purposes for which they are being processed have not been satisfied.
    </p>

    <p class="fs-10">
      I am aware of my rights under the Data Privacy Act, including the following:
    </p>
    <ul class="number-list fs-10">
      <li>The right to access my personal information</li>
      <li>The right to object to the processing of my personal information</li>
      <li>The right to erasure or blocking of my personal information</li>
      <li>The right to be informed of the existence of processing my personal information</li>
      <li>The right to damages</li>
      <li>The right to lodge a complaint before the National Privacy Commission</li>
    </ul>

    <p class="fs-10 fw-bold">
      I understand that in case of complaints, concerns, or questions regarding the processing of my personal information, I may address them to:
    </p>
    <ul class="number-list fs-10">
      <li>Data Privacy Officer</li>
      <li>Department of Science and Technology IX</li>
      <li>Pettit Barracks, Zamboanga City, 7000, Philippines</li>
      <li>Tel No. (062) 991-1024 | Email: ord@ro9.dost.gov.ph</li>
    </ul>

    <p class="fs-10">
      This consent and authorization remain valid and subsisting for a limited period consistent with the purpose above or until otherwise revoked or cancelled in writing.
    </p>

    <div class="d-flex justify-content-center w-100 mb-3 mt-5">
      <b-button @click="check()" variant="primary">I Understand</b-button>
    </div>
  </div>

  <Checkbox />
</div>

    </b-modal>
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
                    designation: null,
                    is_4ps: false,
                    is_pwd: false,
                    is_ip: false,
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
                fullPage: true,
                is_agree: false,
                formConsent :false
            }
        },
        watch: {
            "is_agree"(val){
                if(val){
                    this.formConsent = true;
                }
            },
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
            check(){
                this.formConsent  =  false;
                this.is_agree  =  true;
            }
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
    height: 135px;
    border-top: 0.1rem solid #e4e2e2;
    background-color: #fff;
    z-index: 10;
}
</style>