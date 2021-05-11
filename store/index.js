export const state = () => ({
  token: null
})

export const getters = {
  getAuthorization (state) {
    return { headers: { Authorization: `Bearer ${state.token}` } }
  },
  isAuthorised (state) {
    return state.token
  }
}

export const mutations = {
  setToken (state, payload) {
    state.token = payload
  }
}

export const actions = {
  removeToken ({ commit }) {
    commit('setToken', null)
    this.$cookies.remove('auth_token', { path: '/' })
  },
  setToken ({ commit }, payload) {
    commit('setToken', payload)
    this.$cookies.set('auth_token', payload, { maxAge: 86400, path: '/' })
  },
  nuxtServerInit ({ commit, dispatch }, context) {
    if (context.app.$cookies.get('auth_token')) {
      commit('setToken', context.app.$cookies.get('auth_token'))
    }
  }
}
