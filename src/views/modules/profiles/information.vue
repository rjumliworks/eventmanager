<template>
    <Layout>
        <div class="page-title-box" style=" border-top: 1px solid #e0e0e0; position: fixed; width: 100%; margin-top: -24px; z-index: 100;">
            <h6 class="fw-bold mb-0">Personal Information</h6>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active fs-10">Information about your account details and preferences.</li>
            </ol>
        </div>
        <br/><br/>
        <div class="row mt-2">
            <div class="col-md-12">
                <div class="form-floating">
                    <input type="text" class="form-control form-control-sm" v-model="form.firstname" id="firstnamefloatingInput" placeholder="Enter your firstname">
                    <label for="firstnamefloatingInput">First Name</label>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-floating">
                    <input type="text" class="form-control form-control-sm" v-model="form.middlename" id="firstnamefloatingInput" placeholder="Enter your firstname">
                    <label for="firstnamefloatingInput">Middle Name</label>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-floating">
                    <input type="text" class="form-control form-control-sm" v-model="form.lastname" id="firstnamefloatingInput" placeholder="Enter your firstname">
                    <label for="firstnamefloatingInput">Last Name</label>
                </div>
            </div>
            <div class="col-md-12"><hr class="text-muted"/></div>
            <div class="col-md-12">
                <div class="form-floating">
                    <input type="text" class="form-control form-control-sm" v-model="form.email" id="firstnamefloatingInput" placeholder="Enter your firstname">
                    <label for="firstnamefloatingInput">Email</label>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-floating">
                    <input type="text" class="form-control form-control-sm" v-model="form.contact_no" id="firstnamefloatingInput" placeholder="Enter your firstname">
                    <label for="firstnamefloatingInput">Contact no.</label>
                </div>
            </div>
        </div>
        <!-- <div class="form-floating">
            <input type="text" class="form-control form-control-sm" v-model="form.firstname" id="firstnamefloatingInput" placeholder="Enter your firstname">
            <label for="firstnamefloatingInput">First Name</label>
        </div>
        <div class="form-floating">
            <input type="text" class="form-control form-control-sm" v-model="form.middlename" id="firstnamefloatingInput" placeholder="Enter your firstname">
            <label for="firstnamefloatingInput">Middle Name</label>
        </div>
        <div class="form-floating">
            <input type="text" class="form-control form-control-sm" v-model="form.lastname" id="firstnamefloatingInput" placeholder="Enter your firstname">
            <label for="firstnamefloatingInput">Last Name</label>
        </div> -->
        <footer class="footer p-2">
            <div class="p-3 mt-n1">
                <button type="button" class="btn w-100 btn-primary waves-effect waves-light fs-11">Save</button>
            </div>
        </footer>
    </Layout>
</template>
<script>
import Layout from "@/layouts/main.vue";
export default {
    components: { Layout },
    data(){
        return {
            form: {
                firstname: this.$store.state.auth.user.data.firstname,
                middlename: this.$store.state.auth.user.data.middlename,
                lastname: this.$store.state.auth.user.data.lastname,
                email: this.$store.state.auth.user.data.email,
                contact_no: this.$store.state.auth.user.data.contact_no,
            },
            participant_id: this.$store.state.auth.user.data.id,
            load: false
        }
    }
};
</script>
<style>
 .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 80px;
        border-top: 0.1rem solid #e4e2e2;
        background-color: #fff;
        z-index: 10;
    }
</style>