import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-heroes-list',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './heroes-list.html'
})
export class HeroesList {
  heroes = [
    { id: 1, name: 'Spiderman' },
    { id: 2, name: 'Superman' },
    { id: 3, name: 'Wonder Woman' },
  ];
}