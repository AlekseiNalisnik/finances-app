import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  styleUrls: ['../styles/material-custom.scss'],
})
export class AppComponent {
  title = 'finances-app';
}
