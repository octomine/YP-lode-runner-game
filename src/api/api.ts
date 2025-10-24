import axios/* , { AxiosInstance, CreateAxiosDefaults } */ from 'axios'

export const apiFile = axios.create({
  baseURL: '',
  responseType: 'blob',
})
