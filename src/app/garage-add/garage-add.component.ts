import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-garage-add',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './garage-add.component.html',
  styleUrl: './garage-add.component.css'
})
export class GarageAddComponent {
  constructor(public apiService: ApiService, private datePipe: DatePipe) {}

  addForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    formatStartDate: new FormControl(''),
    formatEndDate: new FormControl(''),
    permitNum: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    zip: new FormControl(''),
    telephone: new FormControl(''),
    section: new FormControl(''),
    orgName: new FormControl(''),
    orgAddress: new FormControl(''),
    orgTelephone: new FormControl(''),
    notes: new FormControl(''),
    timestamp: new FormControl(''),
  })

  ngOnInit() {
    console.log("Date:", new Date());
  }

  addSale() {
    const start = this.datePipe.transform(this.addForm.get('startDate')?.value, "yyyy-MM-dd", "GMT");
    const end = this.datePipe.transform(this.addForm.get('endDate')?.value, "yyyy-MM-dd", "GMT");
    this.addForm.get('formatStartDate')?.setValue(start === null ? '' : start);
    this.addForm.get('formatEndDate')?.setValue(end === null ? '' : end);

    let today = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
    this.addForm.get('timestamp')?.setValue(today);

    this.apiService.addGarage(this.addForm.value).subscribe(data => {
      console.log(data);
    });
  }
}
