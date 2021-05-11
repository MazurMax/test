import qs from 'qs'

export default function ({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    return {
      ...config,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
      headers: {
        ...config.headers,
        'Accept-Language': 'en'
      },
      params: {
        ...config.params
      }
    }
  })

  $axios.onResponse((response) => {
    if (response && response.data) {
      const data = response.data

      const res = {
        ...response,
        data
      }
      if (res.data && res.data.error_code) {
        switch (res.data.error_code) {
          case 404: {
            redirect('/404')
            break
          }
          case 403: {
            redirect('/404')
            break
          }
          case 401: {
            store.dispatch('removeToken')
            redirect('/login')
            break
          }
        }
      }
      return res
    }
  })

  $axios.onError(({ response }) => {
    if (response && response.status) {
      if (response.status === 404) {
        redirect('/404')
      }
      if (response.status === 403) {
        redirect('/404')
      }
      if (response.status === 401) {
        store.dispatch('removeToken')
        redirect('/login')
      }
    }
  })
}
