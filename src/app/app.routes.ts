import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DeedsComponent } from './deeds/deeds.component';
import { GarageSalesComponent } from './garage-sales/garage-sales.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent },
    {path: 'deeds', component: DeedsComponent },
    {path: 'garage', component: GarageSalesComponent },
    {path: 'meetings', component: MeetingsComponent },
    {path: '', component: MainMenuComponent },
];
