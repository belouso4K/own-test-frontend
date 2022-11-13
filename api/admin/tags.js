export default $axios => ({

  async index(page) {
    try {
      return await $axios.$get('/api/v1/admin/tags?page='+page);
    } catch ( err ){
      console.log(err)
    }
  },

  async create( data ){
    try {
      return await $axios.$post('/api/v1/admin/tag/create', data);
    } catch ( err ){
      console.log(err)
    }
  },

  async update(id, data){
    try {
      return await $axios.$put('/api/v1/admin/tag/update/'+id, data);
    } catch ( err ){
      console.log(err)
    }
  },

  async delete( data){
    try {
      return await $axios.$delete('/api/v1/admin/tag/delete/'+data);
    } catch ( err ){
      console.log(err)
    }
  },

})
