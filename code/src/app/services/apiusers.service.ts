import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {forkJoin} from 'rxjs';  // change to new RxJS 6 import syntax
import { serverURL } from '../constants';
import {User} from '../models/users.model';

@Injectable()
export class ApiUsersService {
    constructor(private http: HttpClient) {}
    getUsers() {
        return this.http.get<User[]>(`${serverURL}/persons`);
    }
    createrUser(user: User) {
      return this.http.post(`${serverURL}/persons`, user);
    }
}
