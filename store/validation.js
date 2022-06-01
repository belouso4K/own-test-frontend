export const state = () => ({
  errors: {'434': 34535}
})

export const getters = {
  errors (state) {
    return state.errors
  }
}

export const mutations = {
  SET_VALIDATION_ERRORS (state, errors) {
    state.errors = errors
  }
}

export const actions = {
  setErrors ({ commit }, errors) {
    console.log(errors)
    commit('SET_VALIDATION_ERRORS', errors)
  },
  clearErrors ({ commit }) {
    commit('SET_VALIDATION_ERRORS', {})
  }
}
