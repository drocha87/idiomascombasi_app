import { Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

declare module '@nuxt/types' {
  interface Context {
    $adminapi: NuxtAxiosInstance
    $studentapi: NuxtAxiosInstance
    $publicapi: NuxtAxiosInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $adminapi: NuxtAxiosInstance
    $studentapi: NuxtAxiosInstance
    $publicapi: NuxtAxiosInstance
  }
}

declare module 'vuex/types/index' {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface Store<S> {
    $adminapi: NuxtAxiosInstance
    $studentapi: NuxtAxiosInstance
    $publicapi: NuxtAxiosInstance
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}

const api: Plugin = ({ $axios }, inject) => {
  // Create a custom axios instance to handle administrator api calls
  const admin = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
      },
    },
  })
  // Set baseURL to something different
  admin.setBaseURL('http://192.168.100.3:3330/')
  // Inject to context as $api
  inject('adminapi', admin)

  // Create a custom axios instance to handle student api calls
  const student = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
      },
    },
  })
  // Set baseURL to something different
  student.setBaseURL('http://192.168.100.3:3331/')
  // Inject to context as $api
  inject('studentapi', admin)

  // Create a custom axios instance to handle public api calls
  const publik = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
      },
    },
  })
  // Set baseURL to something different
  publik.setBaseURL('http://192.168.100.3:3332/')
  // Inject to context as $api
  inject('publicapi', admin)
}

export default api
