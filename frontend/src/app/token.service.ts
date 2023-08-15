import { Injectable } from '@angular/core';
import axios from 'axios';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }


  request(method: string, url: string, data: any): Promise<any> {
      let headers: any = {};

      if (this.getAuthToken() !== null) {
          headers = {"Authorization": "Bearer " + this.getAuthToken()};
      }

      return axios({
          method: method,
          url: url,
          data: data,
          headers: headers
      });
  }

  isUserAuthenticated(): Promise<boolean> {
      return this.request('GET', '/check', null)
          .then(response => {
              // Assuming the backend returns true or false for authentication status
              return response.data;
          })
          .catch(error => {
              // If there's an error, assume the user is not authenticated
              return false;
          });
  }
}
