// In src/app/service/user-service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'; // <-- 1. FIX: Corrected import path

@Injectable({
  providedIn: 'root' // <-- 2. FIX: Added this to provide the service
})
export class UserService {

  private usersUrl: string;
  constructor(private http: HttpClient) {
    this.usersUrl = `${environment.apiUrl}/`;
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl+'users');
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl+'adduser', user);
  }
}
