import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListComponent } from './components/list/list.component';
import { GenreComponent } from './components/genre/genre.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
{path:'' , redirectTo:'/list/popular' , pathMatch:'full'},
{path:'list/:category' , component:ListComponent},
{path:'genre/:id' , component:GenreComponent},
{path:'details/movie/:id' , component:MovieDetailsComponent},
{path:'details/actor/:id' , component:ActorDetailsComponent},
{path:'**' , component:NotFoundComponent},
];
