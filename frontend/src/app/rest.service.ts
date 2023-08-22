// user.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { User } from "./model/user";
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private tokenService: TokenService) { }

  list(path:string): Promise<any> {
    return this.tokenService.request("GET", path, {});
  }

  one(path:string,id: string): Promise<any> {
    return this.tokenService.request("GET",path + `/${id}`, {});
  }

  add(path:string, entity: any): Promise<any> {
    return this.tokenService.request("POST", path, entity);
  }

  update(path:string,id: string, entity: any): Promise<any> {
    return this.tokenService.request("POST",path + `/${id}`, entity);
  }

  call(path:string, entity: any): Promise<any> {
    return this.tokenService.request("POST",path, entity);
  }

  delete(path:string,id: string): Promise<any> {
    return this.tokenService.request("DELETE", path + `/${id}`, {});
  }
}
