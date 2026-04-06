import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre',
  imports: [RouterLink, CommonModule],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})
export class GenreComponent implements OnInit {
  id!:string|null;
  genresMoviesArr: any[]= [];
  getCatagoryMovies:any[]=[];
  catagoryName!:any;
  constructor(private _activatedRoute:ActivatedRoute, private httpClient:HttpClient){
  }
  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params)=>{
       this.id = params.get('id');
       if (this.id) {
         this.fetchMoviesByGenre(this.id);
         this.getGenresMoviesArr();
       }
    })


  }

  fetchMoviesByGenre(genreId:string) {
    this.httpClient.get<any>(`${environment.genre_url}discover/movie${environment.api_key}&with_genres=${genreId}`).subscribe({
      next:(res)=>{
        this.getCatagoryMovies = res.results;
      },
      error:(err)=>{
        console.log(err)
      }

    })
}
getGenresMoviesArr(){
  return this.httpClient.get<any>(`${environment.genres_url}${environment.api_key}`).subscribe({
    next:(res)=>{
      this.genresMoviesArr= (res).genres;
      this.getCategoryName();
    },
    error:(error)=>{
      console.log(error)
    }
  })
}

getCategoryName(){
  if (!this.id) return;
  const category = this.genresMoviesArr.find((movie) => movie.id == this.id);
  this.catagoryName = category ? category.name : "Unknown";
}
}
