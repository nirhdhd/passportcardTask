import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { DeleteSnackbarComponent } from '../delete-snackbar/delete-snackbar.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    public service: AppService
  ) {}

  ngOnInit(): void {
    console.log('data', this.data.d.id);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  deletPost() {
    this.service.deleteUserPost(this.data.d.id).subscribe({
      complete: () => {
        this.dialogRef.close({
          id: this.data.d.id,
          error: null,
        });
      },
      error: (err) => {
        this.dialogRef.close({
          id: -1,
          error: err,
        });
      },
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(DeleteSnackbarComponent, {
      duration: 2000,
    });
  }
}
