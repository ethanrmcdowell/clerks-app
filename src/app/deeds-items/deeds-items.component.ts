import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DeedsDialogComponent } from '../deeds-dialog/deeds-dialog.component';

@Component({
  selector: 'app-deeds-items',
  standalone: true,
  imports: [CommonModule, MatTableModule, DeedsDialogComponent],
  templateUrl: './deeds-items.component.html',
  styleUrl: './deeds-items.component.css'
})
export class DeedsItemsComponent {
  constructor (private datePipe: DatePipe, public dialog: MatDialog) {}
  @Input() deedData: any;
  displayedColumns: string[] = ['Document Date', 'Document Type', 'Sidwell', 'Liber', 'Page Number', 'Grantor'];

  ngOnInit() {
    this.deedData.forEach((item: {
      rec_date: string | null; doc_date: string | null; 
}) => {
      item.doc_date = this.datePipe.transform(item.doc_date, "yyyy-MM-dd");
      item.rec_date = this.datePipe.transform(item.rec_date, "yyyy-MM-dd");
    });
  }

  deedsDialog(item: any) {
    const dialogRef = this.dialog.open(DeedsDialogComponent, {
      width: '50%',
      height: '60%',
      minWidth: '400px',
      data: item,
    });
  }
}
