import { Component } from '@angular/core';

import { DatePipe, formatDate } from '@angular/common';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { GarageItemsComponent } from '../garage-items/garage-items.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GarageDialogComponent } from '../garage-dialog/garage-dialog.component';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-garage-search',
  standalone: true,
  imports: [MatSnackBarModule, MatDialogModule, MatRadioModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule, GarageItemsComponent, MatListModule, MatDividerModule],
  templateUrl: './garage-search.component.html',
  styleUrl: './garage-search.component.css'
})
export class GarageSearchComponent {
  constructor(public dialog: MatDialog, private datePipe: DatePipe, private apiService: ApiService, private snackBar: MatSnackBar) {};

  dataSearched: boolean = false;
  startDate: Date | undefined;
  endDate: Date | undefined;
  saleData: any[] = [];

  searchForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    formatStartDate: new FormControl(''),
    formatEndDate: new FormControl(''),
    permitNum: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    section: new FormControl(''),
    orgName: new FormControl(''),
    orgAddress: new FormControl('')
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
    this.dataSearched = false;

    // Transform date objects into yyyy-MM-dd to match DB fields
    const start = this.datePipe.transform(this.searchForm.get('startDate')?.value, "yyyy-MM-dd", "GMT");
    const end = this.datePipe.transform(this.searchForm.get('endDate')?.value, "yyyy-MM-dd", "GMT");
    this.searchForm.get('formatStartDate')?.setValue(start === null ? '' : start);
    this.searchForm.get('formatEndDate')?.setValue(end === null ? '' : end);

    console.log(this.searchForm.valid);

    // Check if the form is valid & ensure there's at least one filter being used
    if (!this.allFieldsEmpty() && this.searchForm.valid) {
      this.apiService.searchGarage(this.searchForm.value).subscribe(data => {
        this.saleData = (data as any)[0];
        this.dataSearched = true;
  
        console.log(this.saleData);
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

  saleDialog(item: any) {
    const dialogRef = this.dialog.open(GarageDialogComponent, {
      width: '50%',
      height: '60%',
      data: item
    });
  }
}
