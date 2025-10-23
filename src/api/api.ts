import axios/* , { AxiosInstance, CreateAxiosDefaults } */ from 'axios'

// const baseURLLocal = ''

// const instances: Record<string, AxiosInstance> = {}

// const getInstance = (baseURL: string) => {
//   if (!instances[baseURL]) {
//     const config: CreateAxiosDefaults = {
//       baseURL,
//       timeout: 1000,
//       withCredentials: true,
//     }
//     if (baseURL === baseURLLocal) {
//       config.responseType = 'blob'
//     }
//     instances[baseURL] = axios.create(config)
//     instances[baseURL].interceptors.response.use(undefined, error => {
//       if (error.response.status === '401') {
//         window.location.href = '/#/login'
//       }
//       throw error
//     })

//     setAdapterForSSR(instances[baseURL])
//   }

//   return instances[baseURL]
// }

export const apiFile = axios.create({
  baseURL: '',
  responseType: 'blob',
})
