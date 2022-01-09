import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Hero } from '../models/hero';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class HeroesServiceService {
  private heroesUrl = GlobalConstants.apiURL + '/heroes';

  httpOptions ={
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor( private http: HttpClient) { }

  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(data=>console.log(data)));
  }

  saveNewHero(hero:Hero){
    // console.log(hero);
     return this.http.post(this.heroesUrl+'/new', hero);
    
  }

  updateHero(hero:Hero){
    return this.http.put(this.heroesUrl+'/'+hero.id, hero);
  }
  
  deleteHero(id:number){
    return this.http.delete(this.heroesUrl+'/'+id);
  }
}
