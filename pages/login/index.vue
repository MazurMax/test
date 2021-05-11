<template>
  <div class="app-wrap">
    <div class="app-cont login">
      <h2>Login</h2>
      <ValidationObserver
        ref="form"
        tag="form"
        class="mt-20"
        @keyup.enter="sendForm"
      >
        <ValidationProvider
          v-slot="{ errors, classes }"
          tag="div"
          name="Email"
          rules="required|email|max:255"
        >
          <input
            v-model.lazy="email"
            :class="classes"
            :disabled="loading"
            class="app-input"
            placeholder="Email"
            type="email"
          >
          <div class="error-message">
            {{ errors[0] }}
          </div>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors, classes }"
          tag="div"
          name="Password"
          rules="required|max:255"
          class="mt-10"
        >
          <input
            v-model.lazy="password"
            :class="classes"
            :disabled="loading"
            class="app-input"
            placeholder="Password"
            type="password"
          >
          <div class="error-message">
            {{ errors[0] }}
          </div>
        </ValidationProvider>
      </ValidationObserver>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <button class="app-button mt-20" @click="sendForm">
        Login
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'empty',
  data () {
    return {
      loading: false,
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    sendForm () {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return false
        }
        this.loading = true
        const params = {
          username: this.email,
          password: this.password,
          client_id: 'frontend_app',
          client_secret: 'secret',
          grant_type: 'password'
        }
        this.$axios.post('/token', params)
          .then((res) => {
            if (res.status === 200) {
              console.log(res)
              this.$store.dispatch('setToken', res.data.access_token)
              this.$router.push('/')
            }
          })
          .catch((err) => {
            if (err.response.status === 400) {
              this.error = err.response.data.error.message
            }
            this.loading = false
            console.log('error', err.data.error.message)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  flex: 0 0 460px;
  border-radius: 8px;
  border: 1px solid gray;
  background: lightgray;
}
</style>
