import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deeds-dialog',
  standalone: true,
  imports: [],
  templateUrl: './deeds-dialog.component.html',
  styleUrl: './deeds-dialog.component.css'
})
export class DeedsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log("DATA ->", this.data);
  };
}
