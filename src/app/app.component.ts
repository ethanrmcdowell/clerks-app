import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clerks-app';
  message: any;

  constructor(private apiService: ApiService) {};

  ngOnInit() {
    this.apiService.getMessage().subscribe(data => {
      console.log(data);
    })
  }
}
