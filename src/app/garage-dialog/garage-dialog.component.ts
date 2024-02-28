import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../api.service';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-garage-dialog',
  standalone: true,
  imports: [MatInputModule, MatDatepickerModule, FormsModule, MatButtonModule, MatNativeDateModule],
  templateUrl: './garage-dialog.component.html',
  styleUrl: './garage-dialog.component.css'
})
export class GarageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<GarageDialogComponent>, private apiService: ApiService) {}

  ngOnInit() {
    console.log(this.data);
  }

  updateSale() {
    
  }

  deleteSale() {
    if (window.confirm("Are you sure you would like to delete the garage sale associated with the permit number " + this.data.permit_no.trim() + "? This action cannot be undone.")) {
      console.log("Deleted (not really...)");
    }
  }

  cancelDialog() {
    this.dialogRef.close();
  }
}
