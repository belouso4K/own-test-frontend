<template>
  <section>
    <div class="container">
      <p style="font-size: 50px">404</p>
      Такой страницы не существует
    </div>
  </section>

</template>

<script>
    export default {
        name: "error.vue",
        layout: (context) => context.route.path.indexOf('/admin/') > -1 ? 'Admin' : 'App',

    }
</script>

<style scoped>

</style>
