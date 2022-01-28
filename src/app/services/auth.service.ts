import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';
import { map, tap } from 'rxjs/operators';
import { Token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authURL = GlobalConstants.localHost + '/auth';
  constructor(private http: HttpClient) {}
  public login(user: any) {
    // console.log('login!', user);
    return this.http.post(this.authURL + '/login', user).pipe(
      tap((data) => {
        return data;
      })
    );
  }
  public getToken() {
    return localStorage.getItem('token');
  }
}
