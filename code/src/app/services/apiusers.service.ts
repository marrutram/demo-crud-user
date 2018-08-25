import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {forkJoin} from 'rxjs';  // change to new RxJS 6 import syntax
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root',
})
export class ApiUsersService {
    private serviceUrl = 'https://person-api-demo.herokuapp.com';
    constructor(private http: HttpClient) {}
    getUsers() {
        return forkJoin(
            this.http.get((`${this.serviceUrl}/persons`))
        );
    }
}