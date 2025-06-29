import { Routes } from '@angular/router';
import { HeroForm } from './heroes/hero-form/hero-form';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'heroes/new', component: HeroForm },
  { path: 'heroes/edit/:id', component: HeroForm },
];
