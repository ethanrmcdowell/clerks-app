import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-deeds-items',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './deeds-items.component.html',
  styleUrl: './deeds-items.component.css'
})
export class DeedsItemsComponent {
  constructor (private datePipe: DatePipe) {}
  @Input() deedData: any;
  displayedColumns: string[] = ['Document Date', 'Document Type', 'Sidwell', 'Liber', 'Page Number', 'Grantor'];

  ngOnInit() {
    this.deedData.forEach((item: { doc_date: string | null; }) => {
      item.doc_date = this.datePipe.transform(item.doc_date, "yyyy-MM-dd");
    });
  }
}
