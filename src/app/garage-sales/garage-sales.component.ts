import { Component } from '@angular/core';

import { DatePipe } from '@angular/common';

import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-garage-sales',
  standalone: true,
  imports: [MatRadioModule, FormsModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule],
  templateUrl: './garage-sales.component.html',
  styleUrl: './garage-sales.component.css'
})
export class GarageSalesComponent {
  constructor(private datePipe: DatePipe, private apiService: ApiService) {};

  garageSelected: any = "search";
  startDate: Date | undefined;
  endDate: Date | undefined;

  testData() {
    const data = {
      start: this.datePipe.transform(this.startDate, "yyyy-MM-dd"),
      end: this.datePipe.transform(this.endDate, "yyyy-MM-dd")
    }
    
    console.log("Searching " + data.start + " to " + data.end);
    this.apiService.searchGarage(data).subscribe(data => {
      console.log(data);
    });
  }
}
