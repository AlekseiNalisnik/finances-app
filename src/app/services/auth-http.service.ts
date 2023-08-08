import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginDto, RegisterDto } from '../interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private readonly authPath = '/api/finances';
  
  constructor(private http: HttpClient) {}

  public login(loginDto: LoginDto): Observable<string> {
    return this.http.post(this.authPath + '/auth', { ...loginDto }, { responseType: 'text' });
  }

  public register(registerDto: RegisterDto): Observable<string> {
    return this.http.post(this.authPath + '/registration', { ...registerDto }, { responseType: 'text' });
  }

  public logout(): Observable<void> {
    return this.http.post<void>(this.authPath + '/logout', null);
  }
}
