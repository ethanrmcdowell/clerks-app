import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-garage-items',
  standalone: true,
  imports: [MatListModule, MatDividerModule, CommonModule],
  templateUrl: './garage-items.component.html',
  styleUrl: './garage-items.component.css'
})
export class GarageItemsComponent {
  constructor(private datePipe: DatePipe) {};

  @Input() saleData: any;

  ngOnInit() {
    this.saleData.sale_date = this.datePipe.transform(this.saleData.sale_date, "yyyy-MM-dd");
    this.saleData.end_date = this.datePipe.transform(this.saleData.end_date, "yyyy-MM-dd");
  }

}
