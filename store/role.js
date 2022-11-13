export const state = () => ({
  users: [],
})

export const actions = {
  // async fetchTags({commit}, page) {
  //   commit('setLoading')
  //
  //   const tags = await this.$api.adminTags.index(page)
  //
  //   commit('setTags', tags)
  //   commit('setLoading', false)
  //   return tags
  // },
}

export const mutations = {
  setUsers(state, data) {
    state.users = data
  },
  pushUsers(state, data) {
    state.users.push(...data)
  },
  deleteUsers(state, id) {
    state.users.splice(state.users.findIndex(
      object => object.id === id), 1)
  },
}

export const getters = {
  getUsers: state => state.users,
  // loading: state => state.loading,
}
