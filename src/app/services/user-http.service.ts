import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/user-interface';

@Injectable()
export class UserHttpService {
    private readonly userUrl = '/api/finances/users';

    constructor(private http: HttpClient) { }

    public getUserProfile(): Observable<User> {
        return this.http.get<User>(this.userUrl);
    }
}