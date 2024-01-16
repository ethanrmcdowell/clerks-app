import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-garage-add',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatDatepickerModule, FormsModule, MatButtonModule],
  templateUrl: './garage-add.component.html',
  styleUrl: './garage-add.component.css'
})
export class GarageAddComponent {


  addSale() {

  }
}
