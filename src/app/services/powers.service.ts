import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Power } from '../models/power';
import { GlobalConstants } from '../common/global-constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PowersService {
  private powersUrl = GlobalConstants.apiURL + '/powers';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private auth: AuthService) {}

  getPowers(): Observable<Power[]> {
    return this.http
      .get<Power[]>(this.powersUrl)
      .pipe(tap((data) => console.log(data)));
  }

  saveNewPower(heroId: number, powerName: string) {
    // console.log(heroId,powerName,);
    let reqData = {
      id_hero: heroId,
      power_name: powerName,
    };

    return this.http
      .post(this.powersUrl + '/new', reqData, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.auth.getToken()}`
        ),
      })
      .pipe(
        tap((data) => {
          return data;
        })
      );
  }

  // updatePower(power:Power){
  //   return this.http.put(this.powersUrl+'/'+power.id, power);
  // }

  deletePower(id: number) {
    console.log('deleting power', id);

    return this.http.delete(this.powersUrl + '/' + id, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.auth.getToken()}`
      ),
    });
  }
  getPowersByHero(heroId: number) {
    return this.http
      .get(`${this.powersUrl}/hero/${heroId}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.auth.getToken()}`
        ),
      })
      .pipe(
        tap((data) => {
          return data;
        })
      );
  }
}
