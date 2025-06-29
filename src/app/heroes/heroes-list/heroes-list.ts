import { Component } from '@angular/core';
import { HeroService, Hero } from '../../core/services/hero.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-heroes-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './heroes-list.html',
})

export class HeroesList implements OnInit {
  heroes$: Observable<Hero[]> | undefined;
  selectedIds: number[] = [];
  displayedColumns: string[] = ['id', 'name', 'photo', 'actions'];

  constructor(private heroService: HeroService) {}

  dataSource = new MatTableDataSource<Hero>();

  ngOnInit() {
    this.heroService.getAll().subscribe(heroes => {
      this.dataSource.data = heroes;
    });
  }

  toggleSelection(id: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedIds.push(id);
    } else {
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
    }
  }

  deleteSelected(): void {
    this.selectedIds.forEach(id => this.heroService.delete(id));
    this.selectedIds = [];
    this.heroes$ = this.heroService.getAll();
  }

  delete(id: number): void {
    this.heroService.delete(id);
    this.heroes$ = this.heroService.getAll(); // actualizar lista
  }

  getImageUrl(hero: Hero): string {
    // Opcional: si no tenés una propiedad 'image', podés usar una imagen generada
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(hero.name)}&size=64&background=random`;
  }
}