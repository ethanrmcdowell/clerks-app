import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { DeedsItemsComponent } from '../deeds-items/deeds-items.component';

@Component({
  selector: 'app-deeds-search',
  standalone: true,
  imports: [DeedsItemsComponent, FormsModule, ReactiveFormsModule, MatListModule, MatCardModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule],
  templateUrl: './deeds-search.component.html',
  styleUrl: './deeds-search.component.css'
})
export class DeedsSearchComponent {
  constructor(private apiService: ApiService, private datePipe: DatePipe, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  dataFetched: boolean = false;
  startDate: Date | undefined;
  endDate: Date | undefined;
  deedData: any[] = [];

  searchForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    formatStartDate: new FormControl(''),
    formatEndDate: new FormControl(''),
    sidwell: new FormControl(''),
    liber: new FormControl(''),
    pageStart: new FormControl(''),
    pageEnd: new FormControl(''),
    grantor: new FormControl(''),
    description: new FormControl('')
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
    this.dataFetched = false;

    // Transform date objects into yyyy-MM-dd to match DB fields
    const start = this.datePipe.transform(this.searchForm.get('startDate')?.value, "yyyy-MM-dd", "GMT");
    const end = this.datePipe.transform(this.searchForm.get('endDate')?.value, "yyyy-MM-dd", "GMT");
    this.searchForm.get('formatStartDate')?.setValue(start === null ? '' : start);
    this.searchForm.get('formatEndDate')?.setValue(end === null ? '' : end);

    console.log(this.searchForm.value);

       // Check if the form is valid & ensure there's at least one filter being used
       if (!this.allFieldsEmpty() && this.searchForm.valid) {
        this.apiService.searchDeeds(this.searchForm.value).subscribe(data => {
          this.deedData = (data as any)[0];
          this.dataFetched = true;
    
          console.log(this.deedData);
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
}
