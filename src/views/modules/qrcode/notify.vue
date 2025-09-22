<template>
    <BModal v-model="showModal" dialog-class="modal-80" hide-footer body-class="p-0" header-class="p-0"  class="v-modal-custom" content-class="border-0" centered hide-header-close>
        <BRow v-if="session" class="g-0">
            <BCol lg="12">
                <div class="modal-body p-4 text-center">
                    <h2 class="lh-base mb-0 fw-semibold fs-12 text-center"><span class="text-primary">Attendance</span> <span class="text-danger">Notification</span></h2>
                    <p class="text-muted fs-10 mb-4  text-center">Your attendance has been successfully submitted. Thank you for participating in this event!</p>
                        <div class="alert alert-warning small mt-3" role="alert">
                             {{ session }}
                        </div>
                    <button type="button" @click="hide()" class="btn btn-light btn-sm mt-3 mb-2">Close</button>
                    
                </div>   
            </BCol>
        </BRow>
    </BModal>
</template>
<script>
export default {
    data(){
        return {
            session: null,
            showModal: false
        }
    },
    methods: { 
        show(session){
            this.session = session;
            this.showModal = true;
        },
        hide(){
            this.$store.commit('NOTIFY_USER', null)
            this.showModal = false;
        }
    }
}
</script>
<style>
    .smiley-container {
    display: inline-block;
    text-align: center;
    width: 40px;
    cursor: pointer;
    }
    .smiley-container2 {
    display: inline-block;
    text-align: center;
    width: 55px;
    }
    .smiley-container i:hover {
        transform: scale(1.3);
        color: var(--hover-color);
    }
    .smiley-text {
    display: block;
    margin-top: 5px;
    }
    .modal-80 {
    max-width: 90% !important;  
    margin: auto;              
    }
</style>