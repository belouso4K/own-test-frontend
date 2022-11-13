<template>
  <div class="col-md-5">
    <div class="card card-primary">

      <form action="" @submit.prevent="create()">
        <div class="card-header">
          Добавление тега
        </div>
        <div class="card-body">

          <div class="form-group">
            <label for="tag-name">Название тега*</label>
            <input v-model="tag" type="text" class="form-control" id="tag-name" placeholder="Введите тег">
            <p v-if="!validations.tag.valid" class="error-text">{{ validations.tag.message }}</p>
          </div>
          <div class="form-group">
            <label for="tag-slug">url</label>
            <input v-model="slug" type="text" class="form-control" id="tag-slug" placeholder="Введите url для тега">
            <p class="error-text"></p>
          </div>

        </div>
        <div class="card-footer">
          <button type="submit" class="btn btn-primary float-right">Сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateTag",
  data() {
    return {
      tag: '',
      slug: '',
      validations: {
        tag: {
          valid: true,
          message: ''
        },
      },
    }
  },
  methods: {
    async create(e) {
      if(this.validation()) {
        // if (this.loading) {
        //   e.target.disabled=disabled
        // }
        await this.$api.adminTags.create({tag: this.tag, slug: this.slug})
        await this.$store.dispatch('tags/fetchTags', 1)
        this.tag = ''
        this.slug = ''
      }
    },
    validation() {
      let validNewSlugForm = true;

      if( this.tag === '' ){
        validNewSlugForm = false;

        this.validations.tag.valid = false;
        this.validations.tag.message = 'Введите тег'
      }else{
        if (this.tag.length > 50) {
          validNewSlugForm = false;

          this.validations.tag.valid = false;
          this.validations.tag.message = 'Длина тега должна быть меньше 50 символов'
        } else {
          this.validations.tag.valid = true;
          this.validations.tag.message = '';
        }
      }

      return validNewSlugForm;
    },
  }
}
</script>

<style scoped>
.error-text {
  color: red;
  margin-top: 4px;
}
</style>
