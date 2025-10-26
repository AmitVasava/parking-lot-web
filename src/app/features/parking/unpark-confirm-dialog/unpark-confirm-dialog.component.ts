import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unpark-confirm-dialog',
  templateUrl: './unpark-confirm-dialog.component.html'
})
export class UnparkConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<UnparkConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
