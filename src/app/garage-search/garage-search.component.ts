import { Component } from '@angular/core';

import { DatePipe, formatDate } from '@angular/common';

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

@Component({
  selector: 'app-garage-search',
  standalone: true,
  imports: [MatDialogModule, MatRadioModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule, GarageItemsComponent, MatListModule, MatDividerModule],
  templateUrl: './garage-search.component.html',
  styleUrl: './garage-search.component.css'
})
export class GarageSearchComponent {
  constructor(public dialog: MatDialog, private datePipe: DatePipe, private apiService: ApiService) {};

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

  searchData() {
    this.dataSearched = false;

    // Transform date objects into yyyy-MM-dd to match DB fields
    const start = this.datePipe.transform(this.searchForm.get('startDate')?.value, "yyyy-MM-dd", "GMT");
    const end = this.datePipe.transform(this.searchForm.get('endDate')?.value, "yyyy-MM-dd", "GMT");
    this.searchForm.get('formatStartDate')?.setValue(start === null ? '' : start);
    this.searchForm.get('formatEndDate')?.setValue(end === null ? '' : end);

    console.log(this.searchForm.value);

    this.apiService.searchGarage(this.searchForm.value).subscribe(data => {
      this.saleData = (data as any)[0];
      this.dataSearched = true;

      console.log(this.saleData);
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
