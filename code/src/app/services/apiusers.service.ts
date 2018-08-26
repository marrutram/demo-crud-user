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
    activeUser(id, isActive) {
      return this.http.post(`${serverURL}/persons/${id}/${isActive}`, {id: id});
    }
    deleteUser(id) {
      return this.http.delete(`${serverURL}/persons/${id}`);
    }
    updateUser(id, user) {
      return this.http.put(`${serverURL}/persons/${id}`, user);
    }
}
