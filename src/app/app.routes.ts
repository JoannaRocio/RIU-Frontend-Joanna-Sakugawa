import { Routes } from '@angular/router';
import { HeroesList } from './heroes/heroes-list/heroes-list';
import { HeroForm } from './heroes/hero-form/hero-form';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroesList },
  { path: 'heroes/new', component: HeroForm },
  { path: 'heroes/edit/:id', component: HeroForm },
];
