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
import { MatListModule } from '@angular/material/list';

import { ApiService } from '../api.service';
import { MeetingsItemsComponent } from "../meetings-items/meetings-items.component";
import { MatDialog } from '@angular/material/dialog';
import { MeetingsDialogComponent } from '../meetings-dialog/meetings-dialog.component';

@Component({
    selector: 'app-meetings-search',
    standalone: true,
    templateUrl: './meetings-search.component.html',
    styleUrl: './meetings-search.component.css',
    imports: [MatListModule, MatCardModule, FormsModule, MatRadioModule, MatButtonModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatFormFieldModule, MeetingsItemsComponent]
})
export class MeetingsSearchComponent {
  constructor(public dialog: MatDialog, private datePipe: DatePipe, private apiService: ApiService) {}

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

  ngOnInit() {
    console.log(new Date());
  }

  searchData() {
    const start = this.datePipe.transform(this.searchForm.get('startDate')?.value, "yyyy-MM-dd", "GMT");
    const end = this.datePipe.transform(this.searchForm.get('endDate')?.value, "yyyy-MM-dd", "GMT");
    this.searchForm.get('formatStartDate')?.setValue(start === null ? '' : start);
    this.searchForm.get('formatEndDate')?.setValue(end === null ? '' : end);

    this.apiService.searchMeetings(this.searchForm.value).subscribe(data => {
      this.meetingData = (data as any)[0];

      if (this.meetingData) {
        this.meetingData.forEach(meeting => {
          // remove \r\n and fix date fields
          meeting.description = meeting.description ? meeting.description.replace(/\r\n/g, ' ') : '';
          meeting.sub_ref1 = meeting.sub_ref1 ? meeting.sub_ref1.replace(/\r\n/g, ' ') : '';
          meeting.entry_date = this.datePipe.transform(meeting.entry_date, "yyyy-MM-dd", "GMT");
          meeting.entry_date = this.datePipe.transform(meeting.entry_date, "yyyy-MM-dd", "GMT");
        });
        console.log(this.meetingData);
        this.dataFetched = true;
      }
    });
  }

  meetingDialog(item: any) {
    const dialogRef = this.dialog.open(MeetingsDialogComponent, {
      width: '50%',
      height: '60%',
      data: item
    });
  }
}
