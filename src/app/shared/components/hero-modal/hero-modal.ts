import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-modal',
  standalone: true,
    imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './hero-modal.html',
})
export class HeroModal {
  dialogRef = inject(MatDialogRef<HeroModal>);
  data = inject(MAT_DIALOG_DATA) as { title: string; id?: number; hero?: { id: number; name: string } };
  submitted = false;
  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    id: [this.data.hero?.id ?? this.data.id],
    name: [this.data.hero?.name ?? '', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onClose(): void {
    this.submitted = false;
    this.form.reset();
    this.dialogRef.close();
  }
}
