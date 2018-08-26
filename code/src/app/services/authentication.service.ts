import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { serverURL } from '../constants';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: { username: username, password: password },
    };
    return this.http.post<any>(`${serverURL}/auth/login`, options)
      .pipe(map(user => {
          if (user && user.token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}