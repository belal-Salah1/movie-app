import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import {  languagePipe } from "../../pipes/language.pipe";
import { TimePipe } from "../../pipes/time.pipe";


@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, languagePipe, TimePipe , RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{

   movieId!:string|null ;
   movieDetail:any;
  movieTrailerUrl!:  string;
  secureMovieTrailerUrl!: SafeResourceUrl;
  movieCast: any[] = [];
  currentIndex: number = 0;
  visibleCount: number = 7;
  @ViewChild('video_Container')video_Container!:ElementRef;
  constructor(private _actvatedRoute:ActivatedRoute,private httpClient:HttpClient,
    private sanatizer:DomSanitizer, private _location:Location
  ){}




  ngOnInit() {
    this._actvatedRoute.paramMap.subscribe((params)=>{
        this.movieId =params.get('id');
        if (this.movieId) {
          this.getMovieDetails();
        }
    })

  }

  getMovieDetails(){
    this.httpClient.get<any>(`${environment.url}${this.movieId}${environment.api_key}`).subscribe({
      next:(res)=>{
        this.movieDetail = res;
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.getMovieCast();
  }

  getMovieCast(){
    this.httpClient.get<any>(`${environment.url}${this.movieId}/credits${environment.api_key}`).subscribe({
      next:(res)=>{
        this.movieCast = res.cast.filter((a: any) => a.profile_path);
        this.currentIndex = 0;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  get visibleCast() {
    return this.movieCast.slice(this.currentIndex, this.currentIndex + this.visibleCount);
  }

  moveRight(){
    if (this.currentIndex + this.visibleCount < this.movieCast.length) {
      this.currentIndex++;
    }
  }

  moveLeft(){
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  getMovieTrailer() {
    this.httpClient.get<any>(`${environment.url}${this.movieId}/videos${environment.api_key}`).subscribe({
      next: (res: any) => {
        console.log(res);
        const trailer = res.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
          const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
          this.secureMovieTrailerUrl = this.sanatizer.bypassSecurityTrustResourceUrl(trailerUrl);
        } else {
          this.secureMovieTrailerUrl = '';
        }
      },
      error: (err) => console.log(err),
    });
    this.video_Container.nativeElement.style.display = 'block';

  }

  closeVideo() {
    this.video_Container.nativeElement.style.display = 'none';
  }
  goBack(){
    this._location.back();
  }
}
