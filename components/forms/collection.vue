<template>
  <div class="container mt-20">
    <h2>Create collection</h2>
    <ValidationObserver
      ref="form"
      tag="form"
      class="mt-10 row"
      @keyup.enter="sendForm"
    >
      <ValidationProvider
        v-slot="{ errors, classes }"
        tag="div"
        name="Title"
        class="col-def col-sm-12 mt-10"
        rules="required|max:255"
      >
        <input
          v-model.lazy="form.title"
          :class="classes"
          class="app-input"
          placeholder="Title"
          type="text"
        >
        <div class="error-message">
          {{ errors[0] }}
        </div>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors, classes }"
        tag="div"
        name="Description"
        class="col-def col-sm-12 mt-10"
        rules="max:1024"
      >
        <textarea
          v-model.lazy="form.description"
          :class="classes"
          class="app-input"
          placeholder="Description"
          rows="1"
        ></textarea>
        <div class="error-message">
          {{ errors[0] }}
        </div>
      </ValidationProvider>
    </ValidationObserver>
    <div class="text-right">
      <button class="app-button app-button_auto mt-20" @click="sendForm">
        Submit
      </button>
    </div>
    <div
      v-if="showPopup"
      class="popup"
    >
      <div class="popup__content">
        <h3>Collection created successfully</h3>
        <div class="mt-20">
          Do you want to create another one?
        </div>
        <div class="actions mt-20">
          <n-link class="app-button app-button_text app-button_text__success" to="/collections">No</n-link>
          <button class="app-button app-button_text app-button_text__error" @click="createAnother">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collection',
  data () {
    return {
      showPopup: false,
      form: {
        title: null,
        description: null
      }
    }
  },
  methods: {
    createAnother () {
      this.showPopup = false
      this.form = {
        title: null,
        description: null
      }
      this.$refs.form.reset()
    },
    sendForm () {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return false
        }
        this.loading = true
        this.$axios.post('/userarea/movies/collections', this.form, { ...this.$store.getters.getAuthorization })

          .then((res) => {
            if (res.status === 201) {
              this.showPopup = true
            }
          })
          .catch((err) => {
            console.log('error', err.data.error.message)
          })
      })
    }
  }
}
</script>

<style scoped>

</style>
