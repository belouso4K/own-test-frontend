export default function( { $axios }, inject ){

  function can($permission) {
    let user = {
      role: 'admin',
      access: true,
      permission: [
        'view-post',
        'created-post',
        'updated-post',
        'destroy-post',
      ]
    }

    return user.permission.includes($permission)
  }

  inject('can', can);
}
