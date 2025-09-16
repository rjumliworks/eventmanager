import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/state/auth'
import data from '@/state/data'
import modules from './modules'


const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules: {
        ...modules, 
        auth,
        data    
    },
    strict: process.env.NODE_ENV !== 'production',
})

export default store

