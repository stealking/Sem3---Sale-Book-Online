import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
export class SpotifyService {
  static BASE_URL: string = 'http://localhost:53106/api/book';

  constructor(public http: Http) { }
  query(URL: string, params?:Array<string>): Observable<any[]>{
    let queryURL: string =  `${SpotifyService.BASE_URL}${URL}`;
    if(params){
      queryURL = `${queryURL}?${params.join('&')}`;
    }
    console.log(queryURL);
    return this.http.request(queryURL).map((res: any)=> {return res.json()});
  }
  search(query: Object):Observable<any[]>{
    return this.query(`/searchbooksbyname`,[
      `name=${query['name']}`,
      `author=${query['author']}`,
      
    ]);
  }
  searchTrack(query: string): Observable<any[]>{
    console.log(this.search(query));
    return this.search(query);
  }
  


  getTrack(id: string): Observable<any[]>{
    return this.query(`/tracks/${id}`);
  }
}

export var SPOTIFY_PROVIDER: Array<any> = [
  { provide: SpotifyService, useClass: SpotifyService }
]