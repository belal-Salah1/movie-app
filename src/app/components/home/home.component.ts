import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet ,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  genresMoviesArr: any[]= [];
  isDarkMode = false;
  @ViewChild('ulsContainer') ulsContainer!: ElementRef;
  @ViewChild('logoImage') logoImage!: ElementRef;
  constructor(private _MovieApiService:MovieApiService, private httpCLient:HttpClient){
  }
  ngOnInit() {
    this.getGenresMoviesArr();
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.applyTheme();
  }

  getGenresMoviesArr(){
      return this.httpCLient.get<any>(`${environment.genres_url}${environment.api_key}`).subscribe({
        next:(res)=>{
          this.genresMoviesArr= (res ).genres;
        },
        error:(error)=>{
          console.log(error)
        }
      })
  }
  setUlContainerDisplay(){
    return this.ulsContainer.nativeElement.style.display == 'block'? this.ulsContainer.nativeElement.style.display = 'none': this.ulsContainer.nativeElement.style.display = 'block';
  }
  setLogoImageDisplay(){
    return this.logoImage.nativeElement.style.display == 'block'? this.logoImage.nativeElement.style.display = 'none': this.logoImage.nativeElement.style.display = 'block';
  }
  toggleListIcon(){
    this.setLogoImageDisplay();
    this.setUlContainerDisplay();
  }

  toggleDarkMode(){
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', String(this.isDarkMode));
    this.applyTheme();
  }

  applyTheme(){
    if(this.isDarkMode){
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
