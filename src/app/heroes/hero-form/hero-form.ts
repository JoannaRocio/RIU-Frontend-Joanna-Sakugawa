import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HeroService } from '../../core/services/hero.service';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './hero-form.html',
})
export class HeroForm implements OnInit {
  private fb = inject(FormBuilder);
  private heroService = inject(HeroService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  isEditMode = false;
  heroId?: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');

      if (idParam) {
        this.isEditMode = true;
        this.heroId = +idParam;

        this.heroService.getById(this.heroId).subscribe(hero => {
          if (hero) {
            this.form.patchValue({ name: hero.name });
          } else {
            this.router.navigate(['/heroes']);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const name = this.form.value.name!;
      if (this.isEditMode && this.heroId != null) {
        this.heroService.update({ id: this.heroId, name });
      } else {
        const id = this.heroService.getNextId();
        this.heroService.add({ id, name });
      }
      this.router.navigate(['/heroes']);
    }
  }
}
