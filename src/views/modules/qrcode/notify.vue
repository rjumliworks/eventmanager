<template>
    <BModal v-model="showModal" dialog-class="modal-70" hide-footer body-class="p-0" header-class="p-0"  class="v-modal-custom" content-class="border-0" centered hide-header-close>
        <BRow class="g-0">
            <BCol lg="12">
                <div class="modal-body p-4 text-center">
                    <h2 class="lh-base mb-0 fw-semibold fs-12 text-center"><span class="text-primary">Attendance</span> <span class="text-danger">Notification</span></h2>
       
                        <div class="alert alert-warning small mt-3" role="alert">
                             {{ $store.state.data.notifier }}
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
            showModal: false
        }
    },
    methods: { 
        show(){
            this.showModal = true;
        },
        hide(){
            this.$store.commit('data/NOTIFY_USER', null);
            this.showModal = false;
        }
    }
}
</script>
<style>
    .modal-70 {
    max-width: 80% !important;  
    margin: auto;              
    }
</style>