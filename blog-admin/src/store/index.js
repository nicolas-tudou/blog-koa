import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: ''
  },
  getters: {
    getUser: state => state.user,
    getToken: state => state.token
  },
  mutations: {
    setUserInfo (state, data) {
      let { token, ...user } = data
      state.user = user
      state.token = token
    }
  }
})
