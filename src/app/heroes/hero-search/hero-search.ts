import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.html',
  styleUrls: ['./hero-search.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class HeroSearch {
  filter = '';

  @Output() searchByNameOrId = new EventEmitter<string>();

  onSearch(): void {
    this.searchByNameOrId.emit(this.filter.trim());
  }
}
