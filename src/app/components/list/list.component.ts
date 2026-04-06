import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  movieCatagory: string|null ='';
  moviesArray : any[] = [];
constructor(private _activatedRoute:ActivatedRoute , private httpClient:HttpClient ){

}
  ngOnInit(){
    this._activatedRoute.paramMap.subscribe((params)=>{
    this.movieCatagory = params.get('category');
    if(this.movieCatagory){
      this.fetchCatagoryMovies(this.movieCatagory);
    }
    })
  }

  fetchCatagoryMovies(catagory:string){
      this.httpClient.get<any>(`${environment.url}${catagory}${environment.api_key}`).subscribe({
      next:(res)=>{
        this.moviesArray = res.results;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      }
     });
  }

}
