import { Component, inject } from '@angular/core';
import { HeroService } from '../../core/services/hero.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HeroAddButton } from "../hero-add-button/hero-add-button";
import { Hero } from '../../core/models/hero.model';
import { ConfirmModal } from '../../shared/components/confirm-modal/confirm-modal';
import { MatDialog } from '@angular/material/dialog';
import { HeroModal } from '../../shared/components/hero-modal/hero-modal';

@Component({
  standalone: true,
  selector: 'app-heroes-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    HeroAddButton
],
  templateUrl: './heroes-list.html',
})

export class HeroesList implements OnInit {
  heroes$: Observable<Hero[]> | undefined;
  selectedIds: number[] = [];
  displayedColumns: string[] = ['id', 'name', 'photo', 'actions'];

  private heroService = inject(HeroService);
  private dialog = inject(MatDialog);
  
  dataSource = new MatTableDataSource<Hero>();

  ngOnInit() {
    this.refreshList();
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
    this.refreshList();
  }

  deleteHero(heroId: number): void {
    const dialogRef = this.dialog.open(ConfirmModal, {
      width: '350px',
      data: { message: '¿Estás segura/o de que querés eliminar este superhéroe?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.heroService.delete(heroId);
        this.refreshList();
      }
    });
  }

  getImageUrl(hero: Hero): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(hero.name)}&size=64&background=random`;
  }

  onHeroAdded(newHero: Hero) {
    this.heroService.add(newHero);
    this.refreshList();
  }

  editHero(hero: Hero): void {
    const dialogRef = this.dialog.open(HeroModal, {
      width: '400px',
      data: {
        title: 'Editar héroe',
        hero: hero
      }
    });

    dialogRef.afterClosed().subscribe((updatedHero: Hero) => {
      if (updatedHero) {
        this.heroService.update(updatedHero); 
        this.refreshList();
      }
    });
  }

  refreshList(): void {
    this.heroService.getAll().subscribe(heroes => {
      this.dataSource = new MatTableDataSource<Hero>(heroes);
    });
  }

}