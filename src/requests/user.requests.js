import http from 'k6/http';
import { ENV } from '../config/environments.js';

export class UserApi {
  constructor() {
    this.baseUrl = ENV.BASE_URL;
  }

  // Petición para obtener toda la lista de usuarios
  getAllUsers() {
    return http.get(`${this.baseUrl}/users`);
  }

  // Petición filtrada usando un ID específico
  getUserPosts(userId) {
    return http.get(`${this.baseUrl}/posts?userId=${userId}`);
  }
}