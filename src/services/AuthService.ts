import { AxiosResponse } from "axios";
import { backend } from "../axios/axios";
import IAuthResponse from "../interfaces/IAuthResponse";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
      return backend.post<IAuthResponse>('/login', {email, password})
      
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
      return backend.post<IAuthResponse>('/registration', {email, password})
  }

  static async logout(): Promise<void> {
      return backend.post('/logout')
  }

}