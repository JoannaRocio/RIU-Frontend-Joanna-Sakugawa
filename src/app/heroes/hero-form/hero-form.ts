import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <h2>Formulario de Héroe</h2>
    <!-- Aquí va el formulario con validaciones -->
  `,
})
export class HeroForm {}
