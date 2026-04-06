import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  query: string = '';
  moviesArray: any[] = [];

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q') || '';
      if (this.query) {
        this.searchMovies(this.query);
      }
    });
  }

  searchMovies(query: string) {
    this.httpClient
      .get<any>(`${environment.genre_url}search/movie${environment.api_key}&query=${encodeURIComponent(query)}`)
      .subscribe({
        next: (res) => {
          this.moviesArray = res.results;
        },
        error: (err) => {
          console.error('Error searching movies:', err);
        }
      });
  }
}
