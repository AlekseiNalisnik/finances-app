import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UserHttpService } from 'src/app/services/http/user-http.service';
import { UserDataService } from 'src/app/services/data/user-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  providers: [UserDataService, UserHttpService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    public readonly userDataService: UserDataService,
    public readonly authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.getUserProfile();
  }

  public logout(): void {
    this.authService.logout();
  }

  private getUserProfile(): void {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.userDataService.getUserProfile();
      }
    });
  }
}
