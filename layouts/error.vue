<template>
  <section>
    <div class="container">
      <p style="font-size: 50px">404</p>
      Такой страницы не существует
      <h1>{{ error.statusCode }}</h1>
      <h2>{{ error.message }} </h2>
    </div>
  </section>
</template>
<script>
    export default {
      name: "error",
      layout: 'App',
      props: ['error']
      // layout: (context) => context.route.path.indexOf('/admin/') > -1 ? 'Admin' : 'App',
    }
</script>

<style scoped>

</style>
