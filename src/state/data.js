import axios from 'axios'

export default {
    namespaced: true,
    state: () => ({
        sessions: [],
        exhibitors: [],
        hotels: [],
        loaded: false,
    }),
    mutations: {
        SET_DATA(state, payload) {
            state.sessions = payload.sessions
            state.exhibitors = payload.exhibitors
            state.hotels = payload.hotels
            state.loaded = true
        },
        RESET_STATE(state) {     
            state.sessions = []
            state.exhibitors = []
            state.hotels = []
            state.loaded = false
        },
        UPDATE_SESSION(state, session) {
            const idx = state.sessions.findIndex(s => s.id === session.id)
            if (idx !== -1) state.sessions.splice(idx, 1, session)
            else state.sessions.push(session)
        },
        UPDATE_EXHIBITOR(state, exhibitor) {
            const idx = state.exhibitors.findIndex(e => e.id === exhibitor.id)
            if (idx !== -1) state.exhibitors.splice(idx, 1, exhibitor)
            else state.exhibitors.push(exhibitor)
        },
    },
    actions: {
        async loadInitialData({ state, commit, rootState }) {
            if (state.loaded) return; // ✅ skip if already loaded

            // 👤 make sure you access the correct property
            const userId = rootState.auth.user?.data?.id; 
            if (!userId) {
                console.warn('No user id found in store');
                return;
            }

            try {
                const response = await axios.get(`/dashboard?user_id=${userId}`);
                const data = response.data;

                commit('SET_DATA', data);
                commit('SET_LOADED', true); // ✅ mark as loaded if you have this mutation
                console.log('Dashboard data:', data);
            } catch (error) {
                console.error('Dashboard load error:', error.response || error);
            }
        }
    },
    getters: {
        allSessions: s => s.sessions,
        allExhibitors: s => s.exhibitors,
        isLoaded: s => s.loaded
    }
}