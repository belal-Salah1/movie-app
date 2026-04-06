import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService  {

  constructor(private httpCLient:HttpClient) {

  }

  // getPopularMovies():Observable<any>{
  //  return  this.httpCLient.get(`${environment.popular}${environment.api_key}`)
  // }
  // getTopRatedMovies():Observable<any>{
  //   return this.httpCLient.get(`${environment.top_Rated}${environment.api_key}`)
  // }
  // getUpComingMovies():Observable<any>{
  //   return this.httpCLient.get(`${environment.up_Coming}${environment.api_key}`)
  // }
}
