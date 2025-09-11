<template>
    <div>
        <div class="modal-body login-modal p-5">
            <div class="col-lg-12">
                <div class="text-center mt-n4 mb-n4 p-0">
                    <img src="@/assets/images/logo-sm.png" alt="" class="mb-3" style="width: 70px; height: 70px;">
                    <h1 class="mb-0 ff-secondary fw-semibold text-capitalize lh-base fs-13"><span
                            class="text-white">DEPARTMENT OF SCIENCE AND TECHNOLOGY</span></h1>
                    <p class="text-muted mb-2 fs-12">Regional Office No. IX</p>
                </div>
            </div>
        </div>

        <div class="modal-body p-5">
            <form class="customform">
                <BRow class="g-3" style="margin-top: -35px;">
                    <div class="p-2 mt-1" v-if="!sent">
                        <div class="text-muted text-center mb-4 mx-lg-3">
                            <h4 class="">Hello, Welcome</h4>
                            <p>Login with your <span class="fw-semibold">Email Address</span></p>
                        </div>
                        <form>
                            <div class="row">
                                <div class="col-12 mt-n1 mb-0">
                                    <input id="name" v-model="form.email" type="text"
                                        class="form-control form-control-lg" placeholder="Please enter email" style="text-transform: lowercase; background-color: white;" />
                                </div>
                            </div>
                        </form>
                        <div v-if="error" class="alert alert-danger alert-dismissible fade show material-shadow mb-xl-0 mt-3 fs-11" role="alert">
                            <strong>{{error}}</strong> 
                        </div>
                        <div class="mt-4">
                            <BButton variant="primary" class="w-100 mt-n1" type="button" @click="send" :disabled="next">
                                <span v-if="!next">Next</span>
                                <span v-else>Sending..</span>
                            </BButton>
                            <BButton variant="white" class="w-100 mt-2 bg-primary-subtle" type="button">Cancel</BButton>
                            <div class="signin-other-title text-white text-center mt-3"><h5 class="bg-light fs-13 mb-4 title">or</h5></div>
                            <router-link to="/register">
                                <BButton variant="success" class="w-100 mt-0" type="button">
                                    <span>Register</span>
                                </BButton>
                            </router-link>
                        </div>
                    </div>
                    <div class="p-2 mt-4" v-else>
                        <div class="text-muted text-center mb-4 mx-lg-3">
                            <h4 class="">Enter One-Time Password</h4>
                            <p>Please enter the one-time Password (OTP) that we sent to <span
                                    class="fw-semibold">{{ maskedEmail }}</span></p>
                        </div>
                        <form>
                            <div class="d-flex gap-2">
                                <input v-for="(digit, index) in digits" :key="index" ref="otpInputs" type="text"
                                    class="form-control form-control-lg text-center flex-fill" maxlength="1"
                                    :value="digits[index]" @input="onInput($event, index)"
                                    @keydown="onKeydown($event, index)" @paste="onPaste($event, index)"
                                    inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code" style="padding: 0;"/>
                            </div>
                            <!-- <p class="text-muted">Code valid for : <span v-if="timeLeft.total > 0"> {{ timeLeft.minutes }}m {{ timeLeft.seconds }}s remaining
                        </span></p>  -->
                        </form>
                        <div v-if="error" class="alert alert-danger alert-dismissible fade show material-shadow mb-xl-0 mt-3 mb-n3 fs-11" role="alert">
                            <strong>{{error}}</strong> 
                        </div>
                        <div class="mt-4">
                            <BButton variant="primary" class="w-100 mt-2" type="submit" :disabled="sub" @click="submit">Submit</BButton>
                            <BButton variant="white" class="w-100 mt-2 bg-primary-subtle" @click="sent = false" type="button">Back</BButton>
                        </div>
                    </div>
                </BRow>
            </form>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import { mapActions } from 'vuex';
    import { nextTick } from 'vue';
    export default {
        data() {
            return {
                form: {
                    email: null,
                    code: null
                },
                digits: Array.from({
                    length: 6
                }, () => ''),
                sent: false,
                next: false,
                sub: false,
                validationErrors:{},
                error: '',
                showModal: false,
                res: null
            }
        },
        computed: {
            code() {
                return this.digits.join("");
            },
            maskedEmail() {
                if (!this.form.email) return ""
                const [name, domain] = this.form.email.split("@")

                // if name part is shorter than 4, mask entire name
                if (name.length <= 4) {
                    return `${"*".repeat(name.length)}@${domain}`
                }

                // mask last 4 characters before @
                const visible = name.slice(0, name.length - 4)
                return `${visible}****@${domain}`
            }
            
        },
        methods: {
            ...mapActions({
                signIn:'auth/login'
            }),
            async send() {
                this.next = true;
                await axios.post('login', this.form).then(response => {
                    if (response.data.status) {
                        this.next = false;
                        this.sent = true
                    } else {
                        this.next = false;
                    }
                }).catch(({response})=>{
                    if(response.status===422){
                        this.validationErrors = response.data.errors
                    }else{
                        this.validationErrors = {};
                        this.error = response.data.message;
                    }
                    this.next = false;
                }).finally(()=>{
                    this.processing = false
                });
            },
            submit() {
                this.sub = true;
                this.form.code = this.code;
                axios.post('verify', this.form).then(response => {
                    if (response.data.status) {
                        this.sub = false;
                        localStorage.setItem('token', response.data.token);
                        this.signIn();
                    } 
                    this.res = response;
                }).catch(({response})=>{
                    if(response.status===422){
                        this.validationErrors = response.data.errors
                    }else{
                        this.validationErrors = {};
                        this.error = response.data.message;
                        // alert(response.data.message)
                    }
                    this.sub = false
                    this.res = response;
                })
            },
            focusInput(idx) {
                const inputs = this.$refs.otpInputs;
                if (!inputs) return;
                const el = Array.isArray(inputs) ? inputs[idx] : inputs;
                if (el && el.focus) {
                    el.focus();
                    try {
                        el.setSelectionRange(0, 1);
                    } catch (err) {
                        console.log(err);
                    }
                }
            },
            onInput(e, index) {
                const raw = e.target.value || '';
                const cleaned = raw.replace(/\D/g, '');
                if (!cleaned) {
                    this.digits[index] = '';
                    this.updateCode();
                    return;
                }

                const chars = cleaned.split('');
                for (let i = 0; i < chars.length && index + i < this.digits.length; i++) {
                    this.digits[index + i] = chars[i];
                }

                const focusTo = Math.min(index + chars.length, this.digits.length - 1);
                nextTick(() => this.focusInput(focusTo));

                this.updateCode();
            },
            onKeydown(e, index) {
                const key = e.key;
                const target = e.target;

                if (key === 'Backspace') {
                    if ((target.value || '') === '' && index > 0) {
                        e.preventDefault();
                        this.digits[index - 1] = '';
                        nextTick(() => this.focusInput(index - 1));
                        this.updateCode();
                    } else {
                        setTimeout(() => {
                            const v = (this.$refs.otpInputs[index] && this.$refs.otpInputs[index].value || '')
                                .replace(/\D/g, '').slice(0, 1);
                            this.digits[index] = v || '';
                            this.updateCode();
                        }, 0);
                    }
                } else if (key === 'ArrowLeft') {
                    e.preventDefault();
                    if (index > 0) this.focusInput(index - 1);
                } else if (key === 'ArrowRight') {
                    e.preventDefault();
                    if (index < this.digits.length - 1) this.focusInput(index + 1);
                }
            },
            onPaste(e, index) {
                e.preventDefault();
                const paste = (e.clipboardData || window.clipboardData).getData('text') || '';
                const chars = paste.replace(/\D/g, '').split('');
                if (chars.length === 0) return;
                for (let i = 0; i < chars.length && index + i < this.digits.length; i++) {
                    this.digits[index + i] = chars[i];
                }
                const focusTo = Math.min(index + chars.length, this.digits.length - 1);
                nextTick(() => this.focusInput(focusTo));
                this.updateCode();
            },
            updateCode() {
                this.form.code = this.code;
                this.$emit('update', this.code);
            },
            hide() {
                this.showModal = false;
            },
        }
    }
</script>
<style scoped>
    input::placeholder {
        font-size: 12px;
        color: #999;
    }
</style>