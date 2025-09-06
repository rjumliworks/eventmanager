<template>
    <BModal v-model="showModal" dialog-class="modal-80" hide-footer body-class="p-0" header-class="p-0"  class="v-modal-custom" content-class="border-0" centered hide-header-close>
        <BRow class="g-0">
            <BCol lg="12">
                <div class="modal-body p-4">
                    <h2 class="lh-base mb-0 fw-semibold fs-12"><span class="text-primary">Customer</span> Satisfaction <span class="text-danger">Feedback</span></h2>
                    <p class="text-muted fs-10 mb-4">Please take a few moments to complete this satisfaction form</p>
                    <div class="border rounded no-border mb-3">
                        <ul class="list-group list-group-flush" style="height: 200px; overflow: auto;">
                            <li class="list-group-item" :class="(list.rating) ? 'bg-dark-subtle' : ''" v-for="(list,index) in questions" v-bind:key="index" style="cursor: pointer;">
                                <div class="text-center">
                                    <p class="fs-10 text-primary fw-semibold">{{list.text}}</p>
                                    <div v-for="(smiley, index1) in smileys" :key="index1" class="smiley-container">
                                        <i :class="[smiley.icon]" 
                                        @click="selectScore(index,smiley.score,smiley.color)"
                                        :style="(list.color === smiley.color) ? 'color: '+ smiley.color : 'color: #777777'"
                                        style="font-size: 20px;"></i>
                                        <span class="smiley-text text-muted mt-0"  style="font-size: 8px;">{{ smiley.text }}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <textarea class="form-control" id="exampleFormControlTextarea5" placeholder="Comments, complaints or suggestions" rows="2" style="font-size: 10px;"></textarea>
                    <button type="button" class="btn btn-primary btn-sm mt-2 mb-3 float-end">Submit</button>
                </div>
            </BCol>
        </BRow>
    </BModal>
</template>
<script>
export default {
    data(){
        return {
            tsr_id: null,
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
            questions: [
                { key: 'SQD0', text: 'I am satisfied with the service that I availed' },
                { key: 'SQD1', text: 'I spent a reasonable amount of time for my transaction' },
                { key: 'SQD2', text: "The office followed the transaction's requirements and steps based on the information provided" },
                { key: 'SQD3', text: 'The steps (including payment) I needed to do for my transaction were easy and simple' },
                { key: 'SQD4', text: 'I easily found information about my transaction from the office or its website' },
                { key: 'SQD5', text: 'I paid a reasonable amount of fees for my transaction (If service was free, mark NA)' },
                { key: 'SQD6', text: 'I feel the office was fair to everyone or "walang palakasan"' },
                { key: 'SQD7', text: 'I was treated courteously by the staff, and (if asked) got clear answers' },
                { key: 'SQD8', text: 'I got what I needed from the government office, or (if denied) denial was sufficiently explained to me' },
            ],
            showModal: false
        }
    },

    methods: { 
        show(){
            this.showModal = true;
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
  width: 55px;
  cursor: pointer;
}
.smiley-container2 {
  display: inline-block;
  text-align: center;
  width: 60px;
  cursor: pointer;
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
  max-width: 90% !important;  /* set the width */
  margin: auto;               /* keep it centered */
}
</style>