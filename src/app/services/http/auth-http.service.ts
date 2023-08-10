import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginDto, RegisterDto } from '../../interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private readonly authPath = '/api/finances';
  
  constructor(private http: HttpClient) {}

  public login(loginDto: LoginDto): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.authPath + '/auth', { ...loginDto });
  }

  public register(registerDto: RegisterDto): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.authPath + '/registration', { ...registerDto });
  }

  public logout(): Observable<void> {
    return this.http.post<void>(this.authPath + '/logout', null);
  }
}
