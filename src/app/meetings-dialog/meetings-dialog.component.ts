import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../api.service';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-meetings-dialog',
  standalone: true,
  imports: [MatInputModule, MatDatepickerModule, FormsModule, MatButtonModule, MatNativeDateModule],
  templateUrl: './meetings-dialog.component.html',
  styleUrl: './meetings-dialog.component.css'
})
export class MeetingsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<MeetingsDialogComponent>, private apiService: ApiService) {}

  // USE MEETING ID 19415

  ngOnInit() {
    console.log("MEETING ->", this.data);
  }

  editMeeting() {
    this.apiService.editMeetings(this.data).subscribe(result => {
      console.log(result);
    });
  }

  deleteMeeting() {
    if (window.confirm("Are you sure you would like to delete this meeting? This action cannot be undone.")) {
      this.apiService.deleteMeetings(this.data).subscribe(result => {
        console.log(result);
      });
    }
  }

  cancelDialog() {
    this.dialogRef.close();
  }
}
