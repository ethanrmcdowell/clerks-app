import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-deeds-dialog',
  standalone: true,
  imports: [MatInputModule, MatDatepickerModule, FormsModule, MatButtonModule, MatNativeDateModule],
  templateUrl: './deeds-dialog.component.html',
  styleUrl: './deeds-dialog.component.css'
})
export class DeedsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DeedsDialogComponent>, private apiService: ApiService) {}

  ngOnInit() {
    console.log("DATA ->", this.data);
  };

  editDeed() {
    this.apiService.editDeeds(this.data).subscribe(results => {
      console.log(results);
    })
  }

  deleteDeed() {
    this.apiService.deleteDeed(this.data).subscribe(results => {
      console.log(results);
    });
  }

  cancelDialog() {
    this.dialogRef.close();
  }
}
