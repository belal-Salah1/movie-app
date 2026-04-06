import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actor-details',
  imports: [],
  templateUrl: './actor-details.component.html',
  styleUrl: './actor-details.component.css'
})
export class ActorDetailsComponent implements OnInit {

  movieId!:string|null ;
  movieCast: any;
  actorId!: string|null;
  actorDetails: any;

  constructor(private httpClient:HttpClient , private _activatedRoute:ActivatedRoute,
    private _location:Location
  ){}
  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((res)=>{
      this.actorId = res.get('id')
      this.getActorDetails();
    }
  )
  }
  getActorDetails() {
    this.httpClient.get<any>(`${environment.actor_url}${this.actorId}${environment.api_key}`).subscribe({
      next: (res) => {
        this.actorDetails = res;
        console.log(this.actorDetails);
      },
      error: (err) => {
        console.log(err);
      }
    });
}
goBack() {
  this._location.back();
}
}
