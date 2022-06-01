// export default function( context ) {
//   try {
//     if (context.$auth.loggedIn) {
//       return context.redirect('/');
//     }
//   } catch (e) { this.error = e.message; }
// }

export default function( { store, redirect } ) {
  if ( store.state.auth.loggedIn ) {
    return redirect('/');
  }
}
