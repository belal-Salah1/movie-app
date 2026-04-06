import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  genresMoviesArr: any[]= [];
  isDarkMode = false;
  sidebarOpen = false;
  searchOpen = false;
  searchQuery = '';
  constructor(private _MovieApiService:MovieApiService, private httpCLient:HttpClient, private router: Router){
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

  toggleListIcon(){
    this.sidebarOpen = !this.sidebarOpen;
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

  toggleSearch(){
    this.searchOpen = !this.searchOpen;
    if (!this.searchOpen) {
      this.searchQuery = '';
    }
  }

  onSearch(){
    const query = this.searchQuery.trim();
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
      this.searchOpen = false;
      this.searchQuery = '';
    }
  }
}