import axios from 'axios'

export const apiFile = axios.create({
  baseURL: '',
  responseType: 'blob',
})
