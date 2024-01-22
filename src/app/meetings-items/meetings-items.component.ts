import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-meetings-items',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './meetings-items.component.html',
  styleUrl: './meetings-items.component.css'
})
export class MeetingsItemsComponent {
  @Input() meetingData: any;

  ngOnInit() {
    // console.log(this.meetingData);
  }
}
