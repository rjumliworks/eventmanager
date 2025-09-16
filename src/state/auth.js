import axios from 'axios'
import router from '@/router'

export default {
    namespaced: true,
    state:{
        authenticated:false,
        user:{}
    },
    getters:{
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        }
    },
    mutations:{
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },
        SET_USER (state, value) {
            state.user = value
        },
        updateAvatar(state, newAvatarUrl) {
            if (state.user && state.user.data) {
                state.user.data.avatar = newAvatarUrl
            }
        },
        updateSignature(state, data) {
            if (state.user && state.user.data) {
                state.user.data.signature = data;
            }
        },
        updateCompleted(state, data) {
            if (state.user && state.user.data) {
                state.user.data.is_completed = data;
            }
        },
    },
    actions:{
        login({commit, dispatch}){
            const config = {
                headers:{
                  Authorization: `Bearer `+localStorage.getItem('token'),
                }
              };
            return axios.get('/participant', config)
            .then(async ({ data }) => {
                commit('SET_USER', data);
                commit('SET_AUTHENTICATED', true);

                // 🔹 Load other datasets in parallel
                await dispatch('data/loadInitialData', null, { root: true });

                router.push({ name: 'dashboard' });
            })
            .catch(({ error }) => {
                console.log('Login error:', error.response || error);
                commit('SET_USER', {});
                commit('SET_AUTHENTICATED', false);
            });
        },
        logout({commit}){
            commit('SET_USER',{})
            commit('SET_AUTHENTICATED',false)
            commit('data/RESET_STATE', null, { root: true })
            localStorage.removeItem("token"); 
        },
        update({commit}){
            const config = {
                headers:{
                  Authorization: `Bearer `+localStorage.getItem('token'),
                }
              };
            return axios.get('/user',config).then(({data})=>{
                commit('UPDATE_IMG',data);
            }).catch(({response:{data}})=>{
                console.log(data);
            })
        },
    }
}