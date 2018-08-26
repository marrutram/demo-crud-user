import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { serverURL } from '../constants';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let body = { username: username, password: password };
    return this.http.post<any>(`${serverURL}/auth/login`, body)
      .pipe(map(user => {
        if (user && user.access_token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    this.http.get(`${serverURL}/auth/logout`);
    localStorage.removeItem('currentUser');
  }
}
