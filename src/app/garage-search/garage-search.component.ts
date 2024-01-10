import { Component } from '@angular/core';

import { DatePipe } from '@angular/common';

import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-garage-search',
  standalone: true,
  imports: [MatRadioModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule],
  templateUrl: './garage-search.component.html',
  styleUrl: './garage-search.component.css'
})
export class GarageSearchComponent {
  constructor(private datePipe: DatePipe, private apiService: ApiService) {};

  dataSearched: boolean = false;
  startDate: Date | undefined;
  endDate: Date | undefined;
  saleData: any[] = [];

  searchForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    permitNum: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    section: new FormControl(''),
    orgName: new FormControl(''),
    orgAddress: new FormControl('')
  });

  searchData() {
    this.dataSearched = false;
    const start = this.datePipe.transform(this.searchForm.get('startDate')?.value, "yyyy-MM-dd");
    const end = this.datePipe.transform(this.searchForm.get('endDate')?.value, "yyyy-MM-dd");
    this.searchForm.get('startDate')?.setValue(start === null ? '' : start);
    this.searchForm.get('endDate')?.setValue(end === null ? '' : start);

    console.log("Search Form ->", this.searchForm.value);

    this.apiService.searchGarage(this.searchForm.value).subscribe(data => {
      this.saleData = (data as any)[0];
      this.dataSearched = true;

      console.log(this.saleData);
    });
  }
}
