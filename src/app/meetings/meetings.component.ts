import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MeetingsSearchComponent } from '../meetings-search/meetings-search.component';
import { MeetingsAddComponent } from '../meetings-add/meetings-add.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [FormsModule, MatRadioModule, MeetingsSearchComponent, MeetingsAddComponent],
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.css'
})
export class MeetingsComponent {
  meetingSelected = "search";

}
