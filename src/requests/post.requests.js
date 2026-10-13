import http from 'k6/http';
import { ENV } from '../config/environments.js';

export class PostApi {
  constructor() {
    this.baseUrl = ENV.BASE_URL;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  createPost(payload) {
    const url = `${this.baseUrl}/posts`;
    return http.post(url, JSON.stringify(payload), { headers: this.headers });
  }
}