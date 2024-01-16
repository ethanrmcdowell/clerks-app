import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-garage-add',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './garage-add.component.html',
  styleUrl: './garage-add.component.css'
})
export class GarageAddComponent {
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
    orgPhone: new FormControl(''),
    notes: new FormControl('')
  })

  addSale() {
    console.log(this.addForm.value);
  }
}
