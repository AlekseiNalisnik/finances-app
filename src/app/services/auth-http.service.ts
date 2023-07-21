import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginDto, RegisterDto } from '../interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private readonly authPath = '/api/finances/auth';
  
  constructor(private http: HttpClient) {}

  public login(loginDto: LoginDto): Observable<string> {
    return this.http.post(this.authPath + '/authenticate', { ...loginDto }, { responseType: 'text' });
  }

  public register(registerDto: RegisterDto): Observable<string> {
    return this.http.post(this.authPath + '/register', { ...registerDto }, { responseType: 'text' });
  }
}
