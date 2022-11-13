<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Создание нового поста</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><nuxt-link to="/admin"><i class="fa-solid fa-house"></i></nuxt-link></li>
              <li class="breadcrumb-item"><nuxt-link to="/admin/posts">Посты</nuxt-link></li>
              <li class="breadcrumb-item active">Создание нового поста</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div>
    </section>
    <section class="content">
      <div class="container-fluid">
        <div class="container-fluid">

          <div class="row">
            <div class="col-12 col-sm-6 d-flex align-items-stretch flex-column">
              <div class="card bg-light d-flex flex-fill">
                <div class="card-header text-muted border-bottom-0">
                  Digital Strategist
                </div>
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-3 text-center">
                      <img height="140" width="140"
                           :src="imgShow"
                           alt="user-avatar"
                           class="img-circle avatar">
                    </div>
                    <div class="col-7 flex-column d-flex justify-content-center">
                      <h2 class="lead"><b>Nicole Pearson</b></h2>
                      <p class="text-muted text-sm"><b>Email: </b> fsfsewefw@mail.ru </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 d-flex">
              <div class="card card-primary flex-fill">
                <div class="card-body">
                  <div class="form-group">
                    <label for="header-text">Имя & Фамилия</label>
                    <input v-model="form.name" type="text" class="form-control" id="header-text" placeholder="Введите заголовок">
<!--                    <p class="error-text" v-if="!validations.title.valid">{{validations.title.message}}</p>-->
                  </div>
                  <div class="form-group">
                    <label for="Email">Электронная почта</label>
                    <input v-model="form.email" type="text" class="form-control" id="Email" placeholder="Введите Email">
<!--                    <p class="error-text" v-if="!validations.title.valid">{{validations.title.message}}</p>-->
                  </div>
                  <div class="form-group">
                    <label for="password">Введите новый пароль</label>
                    <input v-model="form.password" type="password" class="form-control" id="password" placeholder="Введите Пароль">
<!--                    <p class="error-text" v-if="!validations.title.valid">{{validations.title.message}}</p>-->
                  </div>
                  <div class="form-group">
                    <label for="confirm_password">Подтвердите Пароль</label>
                    <input v-model="form.confirm_password" type="password" class="form-control" id="confirm_password" placeholder="Введите пароль еще раз">
<!--                    <p class="error-text" v-if="!validations.title.valid">{{validations.title.message}}</p>-->
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 d-flex">
              <div class="card card-primary flex-fill">
                <div class="card-body">
                  <div class="form-group">
                    <label>Аватар</label>
                    <div class="custom-file">
                      <input @change="onFileChange" type="file" placeholder="Довавьте изображение" class="custom-file-input" id="customFile">
                      <label class="custom-file-label" for="customFile">Добавьте изображение...</label>
<!--                      <p class="error-text" v-if="!validations.img.valid">{{validations.img.message}}</p>-->
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="meta-keywords">Роль</label>
                    <select v-model="form.role_id" class="custom-select">
                      <option value="">-- Без роли --</option>
                      <option :value="role.id" v-for="role in roles">
                        {{role.name}}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Статус</label>
                    <select class="custom-select">
                      <option>Активен</option>
                      <option>Заблокирован</option>
                      <option>Черновик</option>
                    </select>
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button @click="sendBtn" type="submit" class="btn btn-primary float-right">Сохранить</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'addPost',
  layout: 'Admin',
  head() {
    return {
      title: 'Создание нового поста',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Создание нового поста',
        },
      ],
    }
  },

  created() {
    console.log(this.form)
    console.log(this.roles)
  },

  async asyncData({app, params}) {
    const [user,roles] = await Promise.all([
      app.$api.adminUsers.edit(params.id),
      app.$api.adminRoles.index(),
    ])
    const imgShow = user.avatar
    user.avatar = ''
    user.role_id = user.role.id ?? ''

    return {form:user, roles, imgShow}
  },

  data() {
    return {
      BASE_URL: process.env.API_BASE_URL,
      send: false,
      form:{
        email: '',
      },
      // imgShow: false,
      validations: {
        title: {
          valid: true,
          message: ''
        },
        desc: {
          valid: true,
          message: ''
        },
        img: {
          valid: true,
          message: ''
        },
      },
    }
  },

  watch:{
    'form.title':  {
      handler: function (after, before) {
        this.validations.title.valid = true
      },
      deep: true
    },
    'form.desc':  {
      handler: function (after, before) {
        this.validations.desc.valid = true
      },
      deep: true
    },
  },

  methods: {
    async sendBtn() {
      console.log(this.form)
      const data = [
        this.$route.params.id,
        this.formData(this.form)
      ]
      await this.$api.adminUsers.update(...data).then(res => {
        console.log(res)
        this.$router.push({
          path: '/admin/users/'+res.id
        })
      })
      // if (this.validation()) {
        // const data = [this.formData(this.form), this.$route.params.slug]
        // await this.$api.adminPosts.update(...data).then((post) => {
        //   this.send = true
        //   this.$router.push({
        //     path: '/admin/post/'+post.slug
        //   })
        // })
      // }
    },

    formData(data) {
      let formData = new FormData();

      Object.entries(data).forEach(val => {
        formData.append(val[0], val[1])
      })
      formData.append('_method', 'PUT');

      return formData
    },

    // validation() {
    //   let validNewPostForm = true;
    //   let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    //
    //   if( this.form.title == '' ){
    //     validNewPostForm = false;
    //     this.validations.title.valid = false;
    //     this.validations.title.message = 'Введите заголовок'
    //   }else{
    //     if( this.form.title.length < 3 ){
    //       validNewPostForm = false;
    //       this.validations.title.valid = false;
    //       this.validations.title.message = 'Заголовок не может быть меньше 5 символов'
    //     }else{
    //       this.validations.title.valid = true;
    //       this.validations.title.message = '';
    //     }
    //   }
    //
    //   if( this.form.desc == '' ){
    //     validNewPostForm = false;
    //     this.validations.desc.valid = false;
    //     this.validations.desc.message = 'Введите описание'
    //   }else{
    //     if( this.form.desc.length < 3 ){
    //       validNewPostForm = false;
    //       this.validations.desc.valid = false;
    //       this.validations.desc.message = 'Описание не может быть меньше 3 символов'
    //
    //     }else{
    //       this.validations.desc.valid = true;
    //       this.validations.desc.message = '';
    //     }
    //   }
    //   if(this.form.img == ''){
    //     validNewPostForm = false;
    //     this.validations.img.valid = false;
    //     this.validations.img.message = 'Добавьте изображение'
    //   }else{
    //     let condition = allowedExtension.indexOf(this.form.img.type) >-1
    //     condition = typeof this.form.img == 'string' ? true : condition
    //     if( condition ){
    //       this.validations.img.valid = true;
    //       this.validations.img.message = '';
    //
    //     }else{
    //       validNewPostForm = false;
    //       this.validations.img.valid = false;
    //       this.validations.img.message = 'Поддерживаемые типы файлов - jpeg, jpg, png, gif'
    //     }
    //   }
    //
    //   return validNewPostForm;
    // },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;

      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
        vm.imgShow = e.target.result;
      };
      reader.readAsDataURL(files[0]);
      this.form.avatar = files[0]
    },
  },
}
</script>

<style>

textarea {
  height: 125px;
}

.content ul input{
  flex: 1;
  padding: 5px;
  border: none;
  outline: none;
  font-size: 16px;
}

.error-text {
  color: red;
  margin-top: 4px;
}

ul.select-tags {
  border: 1px solid #cecece;
  margin-top: 5px;
  border-radius: 5px;
  padding: 11px 20px 20px 13px;
  position: absolute;
  width: 100%;
  bottom: -192px;
  right: 0;
  left: 0;
  height: 187px;
  overflow: hidden;
  overflow-y: auto;
  z-index: 99999;
  background: #fff;
}

.select-tags li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-tags li span {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  transition: all .3s ease;
  display: block;
  cursor: pointer;
}

.select-tags li span:hover {
  background: #ff3c3c;;
  color: #fff;
  transition: all .3s ease;
}

.select-tags li:not(:last-child) {
  margin-bottom: 5px;
}

.select-tags li p {
  cursor: pointer;
}

.create-new-tag {
  margin-top: 10px;
}

.tags-input .inputs {
  display: flex;

}

.tags-input .inputs i {
  font-size: 20px;
  cursor: pointer;
}

</style>
