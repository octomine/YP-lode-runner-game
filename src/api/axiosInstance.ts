import axios from "axios";

const baseURL = 'https://ya-praktikum.tech/api/v2'

const instance = axios.create({
  baseURL,
  timeout: 1000,
  withCredentials: true
});

export default instance;
