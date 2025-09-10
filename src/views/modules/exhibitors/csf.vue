<template>
    <BModal v-model="showModal" dialog-class="modal-80" hide-footer body-class="p-0" header-class="p-0" class="v-modal-custom" content-class="border-0" centered hide-header-close>
        <BRow class="g-0">
            <BCol lg="12">
                <div class="modal-body text-center p-4">
                    <h2 class="lh-base mb-1 fw-semibold fs-12">
                        <span class="text-primary">Customer</span> Satisfaction <span class="text-danger">Feedback</span>
                    </h2>
                    <p class="text-muted fs-10 mb-4">
                        Please rate your experience by selecting the number of stars that best reflects your
                        satisfaction.
                    </p>
                    <div class="border rounded text-center p-1 mb-3">
                        <div class="align-middle text-warning d-flex justify-content-center" style="font-size: 30px;">
                            <i v-for="star in 5" :key="star" :class="[
                                (hoverRating >= star || rating >= star) ? 'ri-star-fill' : 'ri-star-line',
                                'cursor-pointer',
                                'mx-1'
                                ]" @mouseover="hoverRating = star" 
                                @mouseleave="hoverRating = 0" 
                                @click="setRating(star)">
                            </i>
                        </div>
                    </div>
       
                    <input type="text" v-model="comment" class="form-control form-control-sm chat-input bg-light border-light" 
                        style="font-size: 10px;" id="chat-input" 
                        placeholder="Add your comments (optional)" 
                        @keyup.enter="submit"
                        autocomplete="off">
                    <button type="button" class="btn btn-primary btn-sm mt-4 mb-0" @click="submit">Submit</button>
                </div>
            </BCol>
        </BRow>
    </BModal>
</template>

<script>
import axios from 'axios';
    export default {
        data() {
            return {
                participant_id: null,
                exhibitor_id: null,
                comment: null,
                rating: 0,
                hoverRating: 0,
                showModal: false
            }
        },

        methods: {
            show(participant,exhibitor) {
                this.exhibitor_id = exhibitor;
                this.participant_id = participant;
                this.showModal = true
            },
            hide() {
                this.showModal = false
            },
            setRating(value) {
                this.rating = value
            },
            async submit() {
                this.status = true;
                await axios.post('exhibitors/review', {
                    rate: this.rating,
                    comment: this.comment,
                    participant_id: this.participant_id,
                    exhibitor_id: this.exhibitor_id
                })
                .then(response => {
                    if (response.data.status) {
                        this.status = false;
                        this.form.question = null;
                        this.session.questions.unshift(response.data.data);
                    } 
                }).catch(({response})=>{
                    if(response.status===422){
                        this.validationErrors = response.data.errors
                    }else{
                        this.validationErrors = {};
                        this.error = response.data.message;
                    }
                    this.status = false;
                }).finally(()=>{
                    this.processing = false
                });
            },
        }
    }
</script>
<style>
    .modal-80 {
        max-width: 70% !important;
        margin: auto;
    }
    .cursor-pointer {
        cursor: pointer;
    }
</style>