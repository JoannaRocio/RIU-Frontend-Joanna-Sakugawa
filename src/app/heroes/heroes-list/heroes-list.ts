import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Lista de Héroes</h2>
  `,
})
export class HeroesList {}