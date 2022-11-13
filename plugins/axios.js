export default function({app, route, $axios, redirect, store}) {
  // handle api errors

  $axios.onError((error) => {
    // console.log(app.context.from.path)
    console.log('plugins axios handling error')
    const url = app.context.from.path.split('/')
    const code = parseInt(error.response && error.response.status)

    // not found - show page
    // console.log(url[1],code,app.context.from.path)
    // console.log(error.response)
    // console.log('error',error.response.data.errors)
    if (code === 404) {
      if(url[1] === 'admin') {
        redirect('/admin/404');
      } else {
        redirect('/404')
      }
    }

    if (code === 500) {
      console.log('500')
    }

    if (error.response.status === 500) {
      console.log('500')
    }

    if (code === 422) {
      store.dispatch('validation/setErrors', error.response.status)
    }

    // logout the user if the session expired
    if (app.$auth.loggedIn && [401, 419].includes(code)) {
      logout()
    }
    // throw other errors
    return Promise.reject(error)
  })

  $axios.onRequest(() => {
    store.dispatch('validation/clearErrors')
  })

  async function logout() {
    await app.$auth.logout()
    // app.$auth.setToken('local', false)
    // store.commit('alerts/removeAll')
    if (route.path !== '/login') {
      redirect({ name: 'login' })
    }
  }
}
