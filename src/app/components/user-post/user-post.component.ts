import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
})
export class UserPostComponent implements OnInit {
  @Input() data: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDeleteDialog(d: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: { d },
    });

    dialogRef.afterClosed().subscribe((result: { id: number; error: any }) => {
      this.delete.emit(result);
    });
  }
}
