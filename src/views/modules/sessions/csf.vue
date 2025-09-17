<template>
    <BModal v-model="showModal" dialog-class="modal-80" hide-footer body-class="p-0" header-class="p-0"  class="v-modal-custom" content-class="border-0" centered hide-header-close>
        <BRow v-if="status" class="g-0">
            <BCol lg="12">
                <div class="modal-body p-4 text-center" v-if="status.name == 'Closed'">
                    <h2 class="lh-base mb-0 fw-semibold fs-12 text-center"><span class="text-primary">Customer</span> Satisfaction <span class="text-danger">Feedback</span></h2>
                    <p class="text-muted fs-10 mb-4  text-center">Please take a few moments to complete this satisfaction form</p>
                    <div v-for="(smiley, index1) in smileys" :key="index1" class="smiley-container2" style="margin-bottom: 20px;">
                        <i :class="[smiley.icon]" 
                        @click="selectScore(index,smiley.score,smiley.color)"
                        :style="'color: '+ smiley.color"
                        style="font-size: 16px;"></i>
                        <span class="smiley-text text-muted mt-0"  style="font-size: 7px;">{{ smiley.text }}</span>
                    </div>
                    <div class="border rounded no-border mb-3">
                        <ul class="list-group list-group-flush" style="height: 200px; overflow: auto;">
                            <li class="list-group-item" :class="(list.rating) ? 'bg-dark-subtle' : ''" v-for="(list,index) in questions" v-bind:key="index" style="cursor: pointer;">
                                <div class="text-center">
                                    <p class="fs-10 text-primary fw-semibold">{{list.question}}</p>
                                    <div v-for="(smiley, index1) in smileys" :key="index1" class="smiley-container">
                                        <i :class="[smiley.icon]" 
                                        @click="selectScore(index,smiley.score,smiley.color)"
                                        :style="(list.color === smiley.color) ? 'color: '+ smiley.color : 'color: #777777'"
                                        style="font-size: 20px;"></i>
                                        <!-- <span class="smiley-text text-muted mt-0"  style="font-size: 8px;">{{ smiley.text }}</span> -->
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div v-if="incomplete" class="alert alert-danger border-0 mb-xl-0 fs-10 mt-2 text-center" role="alert">
                        Please rate all <b>questions</b> before submitting.
                    </div>
                    <textarea 
                    class="form-control" 
                    v-model="comment" 
                    id="exampleFormControlTextarea5" 
                    placeholder="Comments, complaints or suggestions" 
                    rows="2" 
                    style="font-size: 10px;"
                   :class="{ 'is-invalid': validationErrors && validationErrors.comment }"
                    ></textarea>
                    <button type="button" @click="submit" class="btn btn-primary btn-sm mt-3 mb-2" :disabled="sub">Submit</button>
                    
                </div>
                <div class="modal-body p-4 text-center" v-else>
                    <h2 class="lh-base mb-0 fw-semibold fs-12 text-center"><span class="text-primary">Customer</span> Satisfaction <span class="text-danger">Feedback</span></h2>
                    <p class="text-muted fs-10 mb-4  text-center">Please take a few moments to complete this satisfaction form</p>
                        <div class="alert alert-warning small mt-3" role="alert">
                            ⚠️ You can only submit feedback once the session has been closed.  
                            Please wait until the event session ends before filling out this form.
                        </div>
                    <button type="button" @click="hide()" class="btn btn-light btn-sm mt-3 mb-2">Close</button>
                    
                </div>   
            </BCol>
        </BRow>
        
        <loading v-model:active="isLoading" background-color="white" :can-cancel="false" :is-full-page="false">
            <div class="text-center">
                <img src="@/assets/images/logo-sm.png" class="heartbeat-spin" style="width: 40px; height: auto;" alt="loading..." />
                <br /><br /><span class="text-dark fw-semibold fs-10">Good things take time…</span>
            </div>
        </loading>
    </BModal>
</template>
<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';
export default {
    components: { Loading },
    data(){
        return {
            comment: null,
            attribute: null,
            progressbarvalue: 0,
            activeTab: 1,
            smileys: [
                { icon: 'bx bxs-happy-beaming', active: false, score: 5, color: '#ee9f03', text: 'Strongly +'},
                { icon: 'bx bxs-smile', active: false, score: 4, color: '#feea1a', text: 'Agree' },
                { icon: 'bx bxs-meh', active: false, score: 3, color: '#5cfd9b', text: 'Neutral' },
                { icon: 'bx bxs-sad', active: false, score: 2, color: '#ff8f01', text: 'Disagree' },
                { icon: 'bx bxs-angry', active: false, score: 1, color: '#dd0000', text: 'Strongly -' }
            ],
            questions: this.$store.state.data.csfs,
            incomplete: false,
            session_id: null,
            validationErrors: null,
            error: null,
            status: null,
            isLoading: false,
            showModal: false
        }
    },
    methods: { 
        show(id,status){
            this.status = status;
            this.session_id = id;
            this.showModal = true;
        }, 
        hasError(field) {
            return this.validationErrors[field] && this.validationErrors[field].length > 0;
        },
        async submit() {
            this.sub = true;
            this.isLoading = true;
            const incomplete = this.questions.filter(q => !q.rating);
            if (incomplete.length > 0) {
                this.incomplete = true;
                this.isLoading = false;
                this.sub = false;
                return;
            }
            await axios.post('/csf/session',{
                questions: this.questions,
                participant_id: this.$store.state.auth.user.data.id,
                session_id: this.session_id,
                comment: this.comment,
            }).then(response => {
                if (response.data.status) {
                    this.$emit('success',response.data.data);
                    this.hide();
                } 
                this.isLoading = false;
                this.sub = false;
            }).catch(({response})=>{
                if(response.status===422){
                    this.validationErrors = response.data.errors || {};
                }else{
                    this.validationErrors = {};
                    this.error = response.data.message;
                }
                this.isLoading = false;
                this.sub = false;
            }).finally(()=>{
                this.processing = false
            });
        }, 
        selectScore(index,rate,color,) {
            this.questions[index].rating = rate;
            this.questions[index].color = color;
        },
        hide(){
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