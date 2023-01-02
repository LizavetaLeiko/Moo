import {AxiosResponse} from 'axios';
import { backend } from '../axios/axios';
import IUser from '../interfaces/IUser';

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return backend.get<IUser[]>('/users')
    }
    static getLiked(userId: string, filmId: string): Promise<AxiosResponse<Array<string>>> {
      return backend.patch<Array<string>>('/liked', {userId, filmId})
    }
    static setUnLiked(userId: string, filmId: string): Promise<AxiosResponse<Array<string>>> {
      return backend.patch<Array<string>>('/unliked', {userId, filmId})
    }
}