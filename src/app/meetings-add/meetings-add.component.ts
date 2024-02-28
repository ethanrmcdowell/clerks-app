import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-meetings-add',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './meetings-add.component.html',
  styleUrl: './meetings-add.component.css'
})
export class MeetingsAddComponent {
  constructor(public apiService: ApiService, private datePipe: DatePipe) {}

  addForm = new FormGroup({
    meetingDate: new FormControl('', [Validators.required]),
    formatDate: new FormControl(''),
    reference: new FormControl('', [Validators.required]),
    subReference: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    timestamp: new FormControl('')
  });

  addMeeting() {
    const meetDate = this.datePipe.transform(this.addForm.get('meetingDate')?.value, "yyyy-MM-dd", "GMT");
    this.addForm.get('formatDate')?.setValue(meetDate === null ? '' : meetDate);

    let today = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
    this.addForm.get('timestamp')?.setValue(today);

    this.apiService.addMeetings(this.addForm.value).subscribe(data => {
      console.log(data);
    })
  }
}
