export default function( context ) {
  try {
    if ( !context.$auth.loggedIn || !context.$auth.user.is_admin ) {
    // if ( !context.$auth.loggedIn || context.
    //   $auth.$state.user.role != 'super-admin' ) {

      return context.redirect('/');
    }

  } catch (e) { this.error = e.message; }

  // if(process.server) {
  //   console.log('server')
  // }
  // if(process.client) {
  //   console.log('client')
  // }
}
