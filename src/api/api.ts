import axios from 'axios'

export const apiFile = axios.create({
  baseURL: 'YP-lode-runner-game',
  responseType: 'blob',
})
