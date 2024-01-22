import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-meetings-search',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatRadioModule, MatButtonModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatFormFieldModule],
  templateUrl: './meetings-search.component.html',
  styleUrl: './meetings-search.component.css'
})
export class MeetingsSearchComponent {
  constructor(private datePipe: DatePipe, private apiService: ApiService) {}

  meetingData: any[] = [];
  dataFetched: boolean = false;

  searchForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    formatStartDate: new FormControl(''),
    formatEndDate: new FormControl(''),
    keyword1: new FormControl(''),
    keyword2: new FormControl(''),
    idNumber: new FormControl('')
  });

  searchData() {
    const start = this.datePipe.transform(this.searchForm.get('startDate')?.value, "yyyy-MM-dd", "GMT");
    const end = this.datePipe.transform(this.searchForm.get('endDate')?.value, "yyyy-MM-dd", "GMT");
    this.searchForm.get('formatStartDate')?.setValue(start === null ? '' : start);
    this.searchForm.get('formatEndDate')?.setValue(end === null ? '' : end);

    this.apiService.searchMeetings(this.searchForm.value).subscribe(data => {
      this.meetingData = (data as any)[0];

      if (this.meetingData) {
        this.meetingData.forEach(meeting => {
          // update meeting.description & meeting.sub_ref1
          meeting.description = meeting.description.replace(/\r\n/g, ' ');
          meeting.sub_ref1 = meeting.sub_ref1.replace(/\r\n/g, ' ');
        });

        this.dataFetched = true;
        console.log(this.meetingData);
      }
    });
  }
}
