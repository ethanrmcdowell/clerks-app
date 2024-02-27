import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { DeedsSearchComponent } from '../deeds-search/deeds-search.component';
import { DeedsAddComponent } from '../deeds-add/deeds-add.component';

@Component({
  selector: 'app-deeds',
  standalone: true,
  imports: [FormsModule, MatRadioModule, DeedsSearchComponent, DeedsAddComponent],
  templateUrl: './deeds.component.html',
  styleUrl: './deeds.component.css'
})
export class DeedsComponent {
  deedSelected = "search";

}
