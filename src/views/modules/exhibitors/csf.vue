<template>
    <BModal v-model="showModal" dialog-class="modal-80" hide-footer body-class="p-0" header-class="p-0"  class="v-modal-custom" content-class="border-0" centered hide-header-close>
        <BRow class="g-0">
            <BCol lg="12">
                <div class="modal-body text-center p-4">
                    <h2 class="lh-base mb-1 fw-semibold fs-12"><span class="text-primary">Customer</span> Satisfaction <span class="text-danger">Feedback</span></h2>
                    <p class="text-muted fs-10 mb-4">Please rate your experience by selecting the number of stars that best reflects your satisfaction.</p>
                    <div class="border rounded no-border text-center p-3 mb-3">
             <rate :length="5" />
                    </div>
                    <button type="button" class="btn btn-primary btn-sm mt-2 mb-3">Submit</button>
                </div>
            </BCol>
        </BRow>
    </BModal>
</template>
<script>
export default {
    data(){
        return {
            rating: 0,
            rater: null,
            showModal: false
        }
    },

    methods: { 
        show(){
            this.showModal = true;
        },  
        hide(){
            this.showModal = false;
        }
    }
}
</script>
<style>
.rater-js {
  display: inline-block;
}
.modal-80 {
  max-width: 70% !important;  /* set the width */
  margin: auto;               /* keep it centered */
}
</style>