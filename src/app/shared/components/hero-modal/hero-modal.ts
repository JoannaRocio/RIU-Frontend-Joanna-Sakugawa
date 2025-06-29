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
  data = inject(MAT_DIALOG_DATA) as { title: string; id: number };

  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    id: [this.data.id],
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
