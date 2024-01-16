import { Component } from '@angular/core';

import { DatePipe } from '@angular/common';

import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { GarageSearchComponent } from "../garage-search/garage-search.component";
import { GarageAddComponent } from '../garage-add/garage-add.component';


@Component({
    selector: 'app-garage-sales',
    standalone: true,
    templateUrl: './garage-sales.component.html',
    styleUrl: './garage-sales.component.css',
    imports: [MatRadioModule, FormsModule, MatCardModule, GarageSearchComponent, GarageAddComponent]
})
export class GarageSalesComponent {
  constructor(private datePipe: DatePipe, private apiService: ApiService) {};

  garageSelected: any = "search";
}
