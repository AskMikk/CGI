import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  template: `
    <h1 mat-dialog-title>Delete confirm</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to delete this?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button color="warn" (click)="onDeleteClick()">Delete</button>
    </div>
  `
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.dialogRef.close('delete');
  }
}
