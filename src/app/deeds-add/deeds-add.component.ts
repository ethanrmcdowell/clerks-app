import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-deeds-add',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './deeds-add.component.html',
  styleUrl: './deeds-add.component.css'
})
export class DeedsAddComponent {
  constructor(public apiService: ApiService, private datePipe: DatePipe) {}

  addForm = new FormGroup({
    docDate: new FormControl(''),
    docDateFormat: new FormControl(''),
    recDate: new FormControl(''),
    recDateFormat: new FormControl(''),
    sidwell: new FormControl(''),
    liber: new FormControl(''),
    grantee: new FormControl(''),
    grantor: new FormControl(''),
    pageNo: new FormControl(''),
    section: new FormControl(''),
    use: new FormControl(''),
    docType: new FormControl(''),
    propDescription: new FormControl(''),
    textDescription: new FormControl('')
  });

  addDeed() {
    let doc = this.datePipe.transform(this.addForm.get('docDate')?.value, "yyyy-MM-dd", "GMT");
    let rec = this.datePipe.transform(this.addForm.get('recDate')?.value, "yyyy-MM-dd", "GMT");
    this.addForm.get('docDateFormat')?.setValue(doc === null ? '' : doc);
    this.addForm.get('recDateFormat')?.setValue(rec === null ? '' : rec);

    console.log("Add Form ->", this.addForm.value);

    this.apiService.addDeeds(this.addForm.value).subscribe(data => {
      console.log(data);
    });
  }
}
