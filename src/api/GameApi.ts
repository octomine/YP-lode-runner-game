import { AxiosResponse } from 'axios';
import { apiFile } from './api';

export class GameAPI {
  static read = (path: string) => apiFile.get<string, AxiosResponse<Blob>>(`/game/${path}`)
}
