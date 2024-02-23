import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { distinctUntilChanged } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-meetings-search',
    standalone: true,
    templateUrl: './meetings-search.component.html',
    styleUrl: './meetings-search.component.css',
    imports: [MatListModule, MatCardModule, FormsModule, MatRadioModule, MatButtonModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatFormFieldModule, MeetingsItemsComponent]
})
export class MeetingsSearchComponent {
  constructor(public dialog: MatDialog, private datePipe: DatePipe, private apiService: ApiService, private snackBar: MatSnackBar) {}

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
        // If a start date is entered, will make the corresponding end date a required field
        this.searchForm.get('startDate')?.valueChanges.pipe(distinctUntilChanged()).subscribe((startDate) => {
          if (this.searchForm.get('startDate')?.value) {
            this.searchForm.get('endDate')?.setValidators([Validators.required]);
          } else {
            this.searchForm.get('endDate')?.clearValidators();
          }
          this.searchForm.get('endDate')?.updateValueAndValidity();
        });
    
        // If an end date is entered, will make the corresponding start date a required field
        this.searchForm.get('endDate')?.valueChanges.pipe(distinctUntilChanged()).subscribe((endDate) => {
          if (this.searchForm.get('endDate')?.value) {
            this.searchForm.get('startDate')?.setValidators([Validators.required]);
          } else {
            this.searchForm.get('startDate')?.clearValidators();
          }
          this.searchForm.get('startDate')?.updateValueAndValidity();
        });
  }

  searchData() {
    const start = this.datePipe.transform(this.searchForm.get('startDate')?.value, "yyyy-MM-dd", "GMT");
    const end = this.datePipe.transform(this.searchForm.get('endDate')?.value, "yyyy-MM-dd", "GMT");
    this.searchForm.get('formatStartDate')?.setValue(start === null ? '' : start);
    this.searchForm.get('formatEndDate')?.setValue(end === null ? '' : end);

    if (!this.allFieldsEmpty() && this.searchForm.valid) {
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
    } else if (this.allFieldsEmpty()) {
      let message = "Please enter at least one filter before searching.";
      this.errorMessage(message);
    } else if (this.searchForm.get("startDate")?.valid || this.searchForm.get("endDate")?.valid) {
      let message = "Error, please check that both start and end date are entered.";
      this.errorMessage(message);
    } else {
      let message = "Error, please check your filters before submitting.";
      this.errorMessage(message);
    }
  }

  allFieldsEmpty() {
    // Checks each form field to ensure at least one filter is being used
    const emptyFields = Object.values(this.searchForm.controls).every(control => {
      const value = control.value;
      return value === null || value === undefined || value === '';
    });
    return emptyFields;
  }

  errorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 8000,
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
