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
  movieCast: any;
  current_translateX:number=0;
  actorsNum!:number;
  counter:number =0;
  maxTranslateX!:number;
  @ViewChild('actors_ul') actors_ul!:ElementRef;
  @ViewChild('actor') actor!:ElementRef;
  actorWidth:number = 0;
  visibleActors: number =0;
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
        this.movieCast = res.cast;
        this.actorsNum = this.movieCast.length;
        this.visibleActors = Math.floor(this.actors_ul.nativeElement.offsetWidth / this.actorWidth);
        this.actorWidth = this.actor.nativeElement.offsetWidth;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  moveRight(){
    if(this.counter <this.actorsNum - this.visibleActors){
      this.current_translateX -=this.actorWidth;
      this.actors_ul.nativeElement.style.transform = `translateX(${this.current_translateX}px)`;
      this.counter+=1;
    }
  }
  moveLeft(){
    if(this.counter > 0){
    this.current_translateX +=this.actorWidth;
    this.actors_ul.nativeElement.style.transform = `translateX(${this.current_translateX}px)`;
    this.counter-=1;
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
