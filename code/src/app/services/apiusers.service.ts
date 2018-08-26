import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {forkJoin} from 'rxjs';  // change to new RxJS 6 import syntax
import { serverURL } from '../constants';

 
@Injectable()
export class ApiUsersService {
    constructor(private http: HttpClient) {}
    getUsers() {
        return forkJoin(
            this.http.get((`${serverURL}/persons`))
        );
    }
}