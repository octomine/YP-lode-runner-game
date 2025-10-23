import axios from "axios";
import { setAdapterForSSR } from "./api-ssr-adapter";

const baseURL = 'https://ya-praktikum.tech/api/v2'

const instance = axios.create({
  baseURL,
  timeout: 1000,
  withCredentials: true
});

setAdapterForSSR(instance);

export default instance;
