import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { ApiService } from './api.service';

import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clerks-app';
  message: any;

  constructor(private apiService: ApiService, private router: Router) {};

  ngOnInit() {
    this.router.navigate(['/main']);

    // this.apiService.getMessage().subscribe(data => {
    //   console.log(data);
    // })
  }
}
