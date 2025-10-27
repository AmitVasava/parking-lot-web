import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from 'src/app/core/models/invoice.model';

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html'
})
export class InvoiceDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { invoice: Invoice },
    private dialogRef: MatDialogRef<InvoiceDialogComponent>
  ) { }

  close() {
    this.dialogRef.close();
  }
}
