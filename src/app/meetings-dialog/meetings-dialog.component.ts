import { Component, Inject, Input } from '@angular/core';
import { GarageDialogComponent } from '../garage-dialog/garage-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meetings-dialog',
  standalone: true,
  imports: [],
  templateUrl: './meetings-dialog.component.html',
  styleUrl: './meetings-dialog.component.css'
})
export class MeetingsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<GarageDialogComponent>) {}

  ngOnInit() {
    console.log("MEETING ->", this.data);
  }
}
