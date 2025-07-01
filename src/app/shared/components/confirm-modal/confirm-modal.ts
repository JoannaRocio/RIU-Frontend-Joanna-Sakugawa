import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './confirm-modal.html',
  styleUrls: ['./confirm-modal.scss']
})
export class ConfirmModal {
  dialogRef = inject(MatDialogRef<ConfirmModal>);
  data = inject(MAT_DIALOG_DATA) as {
    message: string;
    title?: string;
    confirmText?: string;
    cancelText?: string;
    isConfirmation?: boolean; 
  };

  confirm(): void {
    this.dialogRef.close(true);
  }
  
  cancel(): void {
    this.dialogRef.close(false);
  }
}
