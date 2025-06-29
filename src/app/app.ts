import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeroesList } from "./heroes/heroes-list/heroes-list";
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    HeroesList,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
],
})
export class App {}
