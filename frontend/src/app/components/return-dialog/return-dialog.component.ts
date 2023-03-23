import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-return-dialog',
  template: `
    <h1 mat-dialog-title>Return confirm</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to return this book?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button color="warn" (click)="onReturnClick()">Return</button>
    </div>
  `
})
export class ReturnDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReturnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { checkoutId: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onReturnClick(): void {
    this.dialogRef.close('return');
  }
}
