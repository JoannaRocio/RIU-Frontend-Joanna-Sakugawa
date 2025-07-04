import { Component, inject, OnInit } from '@angular/core';
import { HeroService } from '../../core/services/hero.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HeroAddButton } from '../hero-add-button/hero-add-button';
import { Hero } from '../../core/models/hero.model';
import { ConfirmModal } from '../../shared/components/confirm-modal/confirm-modal';
import { MatDialog } from '@angular/material/dialog';
import { HeroModal } from '../../shared/components/hero-modal/hero-modal';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-heroes-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    HeroAddButton,
  ],
  templateUrl: './heroes-list.html',
})
export class HeroesList implements OnInit {
  heroes$: Observable<Hero[]> | undefined;
  selectedIds: number[] = [];
  displayedColumns: string[] = ['id', 'name', 'photo', 'actions'];

  readonly heroService = inject(HeroService);
  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  dataSource = new MatTableDataSource<Hero>();

  ngOnInit() {
    this.refreshList();
  }

  toggleSelection(id: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedIds.push(id);
    } else {
      this.selectedIds = this.selectedIds.filter(
        (selectedId) => selectedId !== id,
      );
    }
  }

  deleteSelected(): void {
    this.selectedIds.forEach((id) => this.heroService.delete(id));
    this.selectedIds = [];
    this.refreshList();
  }

  deleteHero(heroId: number): void {
    const dialogRef = this.dialog.open(ConfirmModal, {
      width: '350px',
      data: {
        message: '¿Estás segura/o de que querés eliminar este superhéroe?',
        title: 'Confirmar eliminación',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        isConfirmation: true,
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.heroService.delete(heroId);
        this.refreshList();

        this.snackBar.open(`Superhéroe eliminado correctamente`, 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  getImageUrl(hero: Hero): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(hero.name)}&size=64&background=random`;
  }

  addHero(name: string): void {
    const newHero = {
      id: this.heroService.getNextId(),
      name,
    };

    const success = this.heroService.add(newHero);
    if (!success) {
      this.dialog.open(ConfirmModal, {
        data: {
          title: 'Superhéroe duplicado',
          message: `El superhéroe "${name}" ya existe.`,
          isConfirmation: false,
        },
      });
    } else {
      this.refreshList();

      this.snackBar.open(`"${name}" agregado correctamente`, 'Cerrar', {
        duration: 3000,
      });
    }
  }

  editHero(hero: Hero): void {
    const dialogRef = this.dialog.open(HeroModal, {
      width: '400px',
      data: {
        title: 'Editar héroe',
        hero: { ...hero },
      },
    });

    dialogRef.afterClosed().subscribe((updatedHero: Hero) => {
      if (updatedHero) {
        this.heroService
          .getAll()
          .pipe(take(1))
          .subscribe((heroes: Hero[]) => {
            const nameExists = heroes.some(
              (h) =>
                h.name.trim().toLowerCase() ===
                  updatedHero.name.trim().toLowerCase() &&
                h.id !== updatedHero.id,
            );

            if (nameExists) {
              this.dialog.open(ConfirmModal, {
                data: {
                  title: 'Superhéroe duplicado',
                  message: `El superhéroe "${updatedHero.name}" ya existe.`,
                  isConfirmation: false,
                },
              });
            } else {
              this.heroService.update(updatedHero);
              this.refreshList();

              this.snackBar.open(
                `"${updatedHero.name}" actualizado correctamente`,
                'Cerrar',
                {
                  duration: 3000,
                },
              );
            }
          });
      }
    });
  }

  refreshList(): void {
    this.heroService
      .getAll()
      .pipe(take(1))
      .subscribe((heroes) => {
        this.dataSource.data = heroes;
      });
  }
}
