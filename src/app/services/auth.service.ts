import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthHttpService } from './http/auth-http.service';
import { LoginDto, RegisterDto } from '../interfaces/auth-interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwtToken';
  public isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem(this.TOKEN_KEY));

  constructor(
    private authHttpService: AuthHttpService,
    private router: Router,
  ) {}

  public login(loginDto: LoginDto): void {
    this.authHttpService.login(loginDto)
      .subscribe(({ token }) => {
        localStorage.setItem(this.TOKEN_KEY, token);
        this.isLoggedIn.next(true);
        this.router.navigate(['/']);
      });
  }

  public register(registerDto: RegisterDto): void {
    this.authHttpService
      .register(registerDto)
      .subscribe(({ token }) => {
        localStorage.setItem(this.TOKEN_KEY, token);
        this.isLoggedIn.next(true);
        this.router.navigate(['/']);
      });
  }

  public logout(): void {
    this.authHttpService
      .logout()
      .subscribe(() => {
        localStorage.removeItem(this.TOKEN_KEY);
        this.isLoggedIn.next(false);
        this.router.navigate(['/login']);
      });
  }

  public getToken(): string | null {
    return this.isLoggedIn.value
      ? localStorage.getItem(this.TOKEN_KEY)
      : null;
  }
}
