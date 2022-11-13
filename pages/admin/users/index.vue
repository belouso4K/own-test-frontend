<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Каталог пользователей</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><nuxt-link to="/admin"><i class="fa-solid fa-house"></i></nuxt-link></li>
              <li class="breadcrumb-item active">Каталог пользователей</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <section class="content">

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Таблица с пользователями</h3>
          <div class="card-tools d-flex align-items-center">
            <nuxt-link class="btn btn-outline-dark btn-sm mr-2 text-nowrap"
                       to="/admin/users/add"><i class="fa-solid fa-user-plus"></i> Добавить</nuxt-link>
            <form class="form-search input-group input-group-sm">
              <input v-model="search"
                     type="text"
                     name="table_search"
                     class="form-control float-right border-dark"
                     placeholder="Поиск...">
              <div class="input-group-append">
                <button type="submit" class="btn btn-default border-dark">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="card-body p-0">
          <table  class="table projects">
            <thead>
            <tr>
              <th style="width: 1%">
                id
              </th>
              <th style="width: 20%">
                Имя
              </th>
              <th style="width: 30%">
                Email
              </th>
<!--              <th style="width: 8%">-->
<!--                Status-->
<!--              </th>-->
              <th style="width: 20%">
                Действия
              </th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="user in users.data">
                <td>
                  {{ user.id }}
                </td>
                <td>
                  <a>
                    {{ user.name }}
                  </a>
                </td>
                <td>
                  <a>
                    {{ user.email }}
                  </a>
                </td>
                <!--              <td class="project-state">-->
                <!--                  <span :class="['badge badge-'+status(post.status).class]">-->
                <!--                    {{ status(post.status).name }}-->
                <!--                  </span>-->
                <!--              </td>-->
                <td class="project-actions">
                  <nuxt-link title="Редактировать" class="btn btn-outline-dark btn-sm" :to="'/admin/users/'+user.id">
                    <i class="fa-solid fa-user-pen"></i>
                  </nuxt-link>
                  <a title="Удалить" @click.prevent="remove(user.id)" class="btn btn-outline-dark btn-sm" href="#">
                    <i class="fas fa-trash">
                    </i>
                  </a>
                </td>
              </tr>
            </tbody>
            <div v-if="loading" class="spinner-load">
              <img src="/loader.gif">
            </div>
          </table>
        </div>
        <!-- /.card-body -->
        <div class="card-footer note-float d-flex align-items-center justify-content-between">
          <pagination :data="users" @pagination-change-page="getResults"></pagination>
          <div class="ml-auto">
            <nuxt-link class="text-dark" to="/admin/posts/delete">
              Заблокированные пользователи <i class="fas fa-trash ml-1"></i>
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- /.card -->
    </section>

  </div>
</template>

<script>

export default {
  name: "posts",
  layout: 'Admin',
  head() {
    return {
      title: 'Каталог пользователей',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Каталог пользователей',
        },
      ],
    }
  },

  data() {
    return {
      loading: false,
      search: '',
      debounce: null,
    }
  },

  created() {
    console.log(this.users)
  },

  async asyncData({app}) {
    const users = await app.$api.adminUsers.index(1)
    return {users}
  },

  watch: {
    search() {
      if(this.search) {
        if (this.search.length >= 2) {
          this.loading = true
          clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            this.$api.adminUsers.search(this.search).then(response => {
              this.users = response
            }).catch(() => {
              console.warn('Oh. Something went wrong')
            }).finally(() => {
              this.loading = false
            });
          }, 600);
        }
      } else {
        this.getResults(1)
      }
    }
  },

  computed: {
    computed: {
      // filteredList() {
      //   return this.postList.filter(post => {
      //     return post.title.toLowerCase().includes(this.search.toLowerCase())
      //   })
      // }
    }
  },

  methods: {
    async getResults(page) {
      this.loading = true
      if (typeof page === 'undefined') {
        page = 1;
      }

      this.users = await this.$api.adminUsers.index(page)
      this.loading = false
    },

    async remove(id) {
      this.loading = true

      await this.$api.adminUsers.delete(id)
      await this.getResults()

      this.loading = false
    },

    async getSearchData() {
      this.users = await this.$api.adminUsers.index(page)
    }
  },
}
</script>

<style scoped>

</style>
