import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserHttpService } from 'src/app/services/user-http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  providers: [UserService, UserHttpService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    public readonly userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.getUserProfile();
  }

  private getUserProfile(): void {
    this.userService.getUserProfile();
  }
}
