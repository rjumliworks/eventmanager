<template>
    <div>
        <div class="modal-body login-modal p-5">
            <h5 class="text-white fs-16 mb-1 mt-n4">Registration Form</h5>
            <p class="text-white-50 fs-11 mb-n5">Please fill out the form carefully and accurate.</p>
        </div>

        <div class="modal-body p-4 mt-4">
            <form class="customform">
                <BRow class="g-3" style="margin-top: -35px;">
                    <div class="p-2 mt-1">
                        <div class="row g-2">
                            <div class="col-6 mt-1">
                                <label class="form-label">First Name</label>
                                <input id="name" v-model="form.firstname" type="text"  class="form-control" placeholder="Enter first name" style="background-color: white;" />
                            </div>
                            <div class="col-6 mt-1">
                                <label class="form-label">Middle Name</label>
                                <input id="name" v-model="form.middlename" type="text"  class="form-control" placeholder="Enter middle name" style="background-color: white;" />
                            </div>
                                <div class="col-6 mt-1">
                                <label class="form-label">Last Name</label>
                                <input id="name" v-model="form.lastname" type="text"  class="form-control" placeholder="Enter last name" style="background-color: white;" />
                            </div>
                            <div class="col-6 mt-1">
                                <label class="form-label">Suffix</label>
                                <input id="name" v-model="form.suffix" type="text"  class="form-control" placeholder="Enter designation" style="background-color: white;" />
                            </div>
                            <!-- <div class="col-12 mt-n1 mb-0">
                                <hr class="text-mtued"/>
                            </div> -->
                            <div class="col-6 mt-1 mb-0">
                                <label class="form-label">Email Address</label>
                                <input id="name" v-model="form.email" type="text"  class="form-control" placeholder="Please enter email" style="text-transform: lowercase; background-color: white;" />
                            </div>
                            <div class="col-6 mt-1 mb-0">
                                <label class="form-label">Contact no.</label>
                                <input id="contact" v-model="form.contact_no" type="text"  class="form-control" placeholder="Please enter contact no." style="text-transform: lowercase; background-color: white;" />
                            </div>
                            <div class="col-6 mt-1 mb-0">
                                <label class="form-label">Birthdate</label>
                                <input id="date" v-model="form.birthdate" type="date"  class="form-control" placeholder="Please enter contact no." style="background-color: white;" />
                            </div>
                            <div class="col-6 mt-1 mb-0">
                                <label>Sex</label>
                                <Multiselect :options="['Male','Female']" label="name" v-model="form.sex" ref="test" placeholder="Select Sex"/>
                            </div>
                            <div class="col-6 mt-1">
                                <label class="form-label">Affiliation</label>
                                <input id="name" v-model="form.affiliation" type="text"  class="form-control" placeholder="Enter affiliation" style="background-color: white;" />
                            </div>
                            <div class="col-6 mt-1">
                                <label class="form-label">Designation</label>
                                <input id="name" v-model="form.designation" type="text"  class="form-control" placeholder="Enter designation" style="background-color: white;" />
                            </div>
                            <div class="col-12 mb-2">
                                <div class="signin-other-title text-white text-center"></div>
                            </div>
                        </div>
                        <div class="mt-4">
                            <BButton variant="primary" class="w-100 mt-n1" type="button" @click="send" :disabled="next">Submit</BButton>
                            <router-link to="/login">
                                <BButton variant="white" class="w-100 mt-2 bg-primary-subtle" type="button">Cancel</BButton>
                            </router-link>
                        </div>
                    </div>
                </BRow>
            </form>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import Multiselect from "@vueform/multiselect";
    import "@vueform/multiselect/themes/default.css";
    export default {
        components: { Multiselect },
        data() {
            return {
                form: {
                    email: null,
                    contact_no: null,
                    birthdate: null,
                    sex: null,
                    affiliation: null,
                    designation: null
                },
                showModal: false
            }
        },
        methods: {
            submit() {
                this.sub = true;
                this.form.code = this.code;
                axios.post('http://eventmanager.test/api/verify', this.form).then(res => {
                    if (res.data.status) {
                        console.log(res.data.token);
                        this.sub = false;
                    }
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
</style>