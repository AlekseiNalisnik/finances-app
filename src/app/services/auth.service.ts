import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthHttpService } from './auth-http.service';
import { LoginDto, RegisterDto } from '../interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwtToken';

  constructor(
    private authHttpService: AuthHttpService,
    private router: Router,
  ) {}

  public login(loginDto: LoginDto): void {
    this.authHttpService.login(loginDto)
      .subscribe((token: string) => {
        localStorage.setItem(this.TOKEN_KEY, token);
        this.router.navigate(['/']);
      });
  }

  public register(registerDto: RegisterDto): void {
    this.authHttpService
      .register(registerDto)
      .subscribe((token: string) => {
        localStorage.setItem(this.TOKEN_KEY, token);
        this.router.navigate(['/']);
      });
  }

  public logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.TOKEN_KEY);

    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn()
      ? localStorage.getItem(this.TOKEN_KEY)
      : null;
  }
}
