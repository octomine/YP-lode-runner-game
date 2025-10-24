import { AxiosResponse } from 'axios';
import { apiFile } from './api';
// это костыль для того чтобы по-быстрому задеплоить, а по хорошему надо использовать перменные окружения
export class GameAPI {
  static read = (path: string) => apiFile.get<string, AxiosResponse<Blob>>(`game/${path}`)
}
