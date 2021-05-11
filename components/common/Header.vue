<template>
  <nav class="header-nav">
    <div class="container pt-10 pb-10">
      <div class="row align-center">
        <div class="col col-def">
          <n-link class="logo" to="/">
            App
          </n-link>
        </div>
        <div class="col col-auto">
          <n-link class="header-link" to="/collections">
            Collections
          </n-link>
        </div>
        <div class="col col-auto">
          <div class="header-link" @click="logOut">
            Logout
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logOut () {
      this.$axios.post('/auth/logout', {}, { ...this.$store.getters.getAuthorization })
        .then((res) => {
          if (res.status === 200) {
            this.$store.dispatch('removeToken')
            this.$router.push('/login')
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: inline-block;
  vertical-align: top;
  font-size: 28px;
  color: #000;
  font-weight: 700;
  font-family: Google Sans, sans-serif;
  transition: opacity 250ms ease;

  &:hover {
    opacity: 0.7;
  }
}

.header-nav {
  background-color: #fafafa;
  box-shadow: 0 0 5px #00000040;
}

.header-link {
  text-transform: uppercase;
  color: darkgrey;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
  }
}
</style>
