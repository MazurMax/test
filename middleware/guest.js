export default function ({ route, store, redirect }) {
  if (!store.getters.isAuthorised && route.path !== '/login') {
    redirect('/login')
  }
}
