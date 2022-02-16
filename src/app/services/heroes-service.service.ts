import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Hero } from '../models/hero';
import { GlobalConstants } from '../common/global-constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HeroesServiceService {
  private heroesUrl = GlobalConstants.apiURL + '/heroes';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    }),
  };

  constructor(private http: HttpClient, private auth: AuthService) {}

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(tap((data) => console.log(data)));
  }

  saveNewHero(hero: Hero) {
    // console.log(hero);
    return this.http.post(this.heroesUrl + '/new', hero, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.auth.getToken()}`
      ),
    });
  }

  updateHero(hero: Hero) {
    return this.http.put(this.heroesUrl + '/' + hero.id, hero, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.auth.getToken()}`
      ),
    });
  }

  deleteHero(id: number) {
    return this.http.delete(this.heroesUrl + '/' + id, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.auth.getToken()}`
      ),
    });
  }
}
