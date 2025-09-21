import axios from 'axios'
import Pusher from 'pusher-js'

export default {
    namespaced: true,
    state: () => ({
        points: 0,
        event: null,
        sessions: [],
        exhibitors: [],
        hotels: [],
        csfs: [],
        loaded: false,
        pusherInitialized: false,
    }),
    mutations: {
        SET_LOADED(state, val) { 
            state.loaded = val 
        },
        SET_DATA(state, payload) {
            state.event = payload.event
            state.points = payload.points
            state.sessions = payload.sessions
            state.exhibitors = payload.exhibitors
            state.hotels = payload.hotels
            state.csfs = payload.csfs
            state.loaded = true
            state.pusherInitialized = false
        },
        RESET_STATE(state) {
            state.event = null     
            state.points = 0
            state.sessions = []
            state.exhibitors = []
            state.hotels = []
            state.loaded = false
            state.pusherInitialized = false
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
        UPDATE_STATUS(state, { sessionId, status }) {
            const session = state.sessions.find(s => s.id === sessionId)
            if (session) session.status = status
        },
        UPDATE_REGISTRATION(state, { sessionId, status }) {
            const session = state.sessions.find(s => s.id === sessionId)
            if (session) session.has_registered = status
        },
        ADD_QUESTION(state, { sessionId, question}) {
            const session = state.sessions.find(s => s.id === sessionId)
            if (session) session.questions.unshift(question)
        },
        ADD_RATING(state, { sessionId, rate}) {
            const session = state.sessions.find(s => s.id === sessionId)
            if (session) session.feedbackable.unshift(rate)
        },
        UPDATE_VOTE(state, { exhibitorId, status }) {
            const exhibit = state.exhibitors.find(s => s.id === exhibitorId)
            if (exhibit) exhibit.has_voted = status
        },
        MINUS_POINTS(state, points) {
            const val = Number(points) || 0 
            state.points = Math.max(0, Number(state.points) - val)
        },
        PLUS_POINTS(state, points) {
            const val = Number(points) || 0  
            state.points = Number(state.points) + val
        },
        ADD_EXHIBIT_RATING(state, { exhibitorId, rate}) {
            const exhibit = state.exhibitors.find(e => e.id === exhibitorId)
            if (exhibit) exhibit.feedbackable.unshift(rate)
        },
        SET_PUSHER_INITIALIZED(state, val) {
            state.pusherInitialized = val
        }
    },
    actions: {
        async loadInitialData({state, dispatch, commit, rootState }) { //state,
            // if (state.loaded) return; // ✅ skip if already loaded

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
                commit('SET_LOADED', true);
                
                if (!state.pusherInitialized) {
                    dispatch('subscribeToRealtime', userId)
                }
                console.log('Dashboard data:', data);
            } catch (error) {
                console.error('Dashboard load error:', error.response || error);
            }
        },
        subscribeToRealtime({ commit, rootState }) {
            const pusher = new Pusher("dws2rpb0uczmrhwzmoya", {
                cluster: "mt1",
                wsHost: "rstwhanda.dost9.ph",
                wsPort: 443,
                wssPort: 443,
                forceTLS: true,
                enabledTransports: ["ws", "wss"],
                disableStats: true,
                wsPath: "/ws"
            })

            const channel = pusher.subscribe("session")
            channel.bind("App\\Events\\SessionEvent", (data) => {
                const currentUserId = rootState.auth.user?.data?.id
                console.log(data);
                switch (data.type) {
                    case 'question':
                        commit('ADD_QUESTION', {
                            sessionId: data.data.session_id,
                            question: data.data
                        })
                    break
                    case 'rating':
                        commit('ADD_RATING', {
                            sessionId: data.data.id,
                            rate: data.data
                        })
                    break
                    case 'status':
                        commit('UPDATE_STATUS', {
                            sessionId: data.data.id,
                            status: data.data.status
                        })
                    break
                    case 'register':
                        if (data.data.participant_id == currentUserId) {
                            commit('UPDATE_REGISTRATION', {
                                sessionId: data.data.session_id,
                                status: true
                            })
                        }
                    break;
                    case 'cancel':
                        if (data.data.participant_id == currentUserId) {
                            commit('UPDATE_REGISTRATION', {
                                sessionId: data.data.session_id,
                                status: false
                            })
                        }
                    break;
                    case 'ex-rating':
                        commit('ADD_EXHIBIT_RATING', {
                            exhibitorId: data.data.id,
                            rate: data.data
                        })
                    break;
                    case 'vote':
                        if (data.participant_id == currentUserId) {
                            commit('UPDATE_VOTE', {
                                exhibitorId: data.id,
                                status: data.status
                            })
                        }
                    break;
                    case 'minus':
                        if (data.data.participant_id == currentUserId) {
                            commit('MINUS_POINTS', data.data.points)
                        }
                    break;
                    case 'plus':
                        if (data.data.participant_id == currentUserId) {
                            commit('PLUS_POINTS', data.data.points)
                        }
                    break;
                }
            })

            commit('SET_PUSHER_INITIALIZED', true)
        }
    },
    getters: {
        points: s => s.points,
        allSessions: s => s.sessions,
        allExhibitors: s => s.exhibitors,
        allCsfs: s => s.csfs,
        isLoaded: s => s.loaded
    }
}