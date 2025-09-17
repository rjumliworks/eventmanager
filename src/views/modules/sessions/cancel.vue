<template>
    <BModal v-model="showModal" dialog-class="modal-80" hide-footer body-class="p-0" header-class="p-0"  class="v-modal-custom" content-class="border-0" centered hide-header-close>
        <BRow class="g-0">
            <BCol lg="12">
                <div class="modal-body text-center p-4">
                    <h2 class="lh-base mb-1 mt-2 fw-semibold fs-12"><span class="text-danger">Cancel Registration</span></h2>
                    <p class="text-muted fs-10 mb-4">Please confirm if you want to cancel your registration for this session.</p>
                    <button type="button" @click="submit" class="btn btn-danger btn-sm mt-n1 mb-1 fs-10 w-90">Confirm</button>
                </div>
            </BCol>
        </BRow>
    </BModal>
    <loading v-model:active="isLoading" background-color="black" :can-cancel="false" :is-full-page="fullPage">
        <div class="text-center">
            <img src="@/assets/images/logo-sm.png" class="heartbeat-spin" style="width: 40px; height: auto;" alt="loading..." />
            <br /><br /><span class="text-white fw-semibold fs-10">Good things take time…</span>
        </div>
    </loading>
</template>
<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';
export default {
    components: { Loading },
    data(){
        return {
            form: { 
                participant_id: null,
                session_id: null
            },
            isLoading: false,
            showModal: false
        }
    },
    methods: { 
        show(session,participant){
            this.form.session_id = session;
            this.form.participant_id = participant;
            this.showModal = true;
        },  
        async submit() {
            this.sub = true;
            this.isLoading = true;
            await axios.post('sessions/cancel', this.form).then(response => {
                if (response.data.status) {
                    this.isLoading = false;
                    this.hide();
                } 
            }).catch(({response})=>{
                if(response.status===422){
                    this.validationErrors = response.data.errors
                }else{
                    this.validationErrors = {};
                    this.error = response.data.message;
                }
                this.sub = false;
            }).finally(()=>{
                this.processing = false
            });
        },
        hide(){
            this.showModal = false;
        }
    }
}
</script>
<style>
.modal-80 {
  max-width: 75% !important;  
  margin: auto;               
}
</style>