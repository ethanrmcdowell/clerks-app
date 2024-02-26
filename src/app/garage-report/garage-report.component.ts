import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-garage-report',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, FormsModule, MatNativeDateModule, MatDatepickerModule, ReactiveFormsModule, MatInputModule, MatTableModule],
  templateUrl: './garage-report.component.html',
  styleUrl: './garage-report.component.css'
})
export class GarageReportComponent {
  constructor(private datePipe: DatePipe, private snackBar: MatSnackBar, private apiService: ApiService) {}

  reportForm = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    formatStartDate: new FormControl(''),
    formatEndDate: new FormControl(''),
  });

  generateReport() {
    const start = this.datePipe.transform(this.reportForm.get('startDate')?.value, "yyyy-MM-dd", "GMT");
    const end = this.datePipe.transform(this.reportForm.get('endDate')?.value, "yyyy-MM-dd", "GMT");
    this.reportForm.get('formatStartDate')?.setValue(start === null ? '' : start);
    this.reportForm.get('formatEndDate')?.setValue(end === null ? '' : end);

    if (!this.reportForm.valid) {
      let message = "Error, please check that both start and end date are entered.";
      this.snackBar.open(message, 'Close', {
        duration: 8000,
      });
    } else {
      console.log(this.reportForm.value);
      this.apiService.reportGarage(this.reportForm.value).subscribe(data => {
        console.log(data);
      });
    }
  }
}
