import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroModal } from '../../shared/components/hero-modal/hero-modal';
import { Hero } from '../../core/models/hero.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeroService } from '../../core/services/hero.service';

@Component({
  selector: 'app-hero-add-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './hero-add-button.html'
})
export class HeroAddButton {
  private dialog = inject(MatDialog);
  private heroService = inject(HeroService);
  @Output() heroAdded = new EventEmitter<Hero>();

  openAddHero() {
    const nextId = this.heroService.getNextId();

    const dialogRef = this.dialog.open(HeroModal, {
      width: '400px',
      data: { title: 'Agregar héroe', id: nextId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroAdded.emit(result);
      }
    });
  }
}
