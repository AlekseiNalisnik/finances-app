import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { UserHttpService } from '../http/user-http.service';
import { User } from '../../interfaces/user-interface';

@Injectable()
export class UserDataService {
    private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

    public getUser(): Observable<User | null> {
        return this.user.asObservable();
    }

    constructor(
        private userHttpService: UserHttpService,
    ) {}

    public getUserProfile(): void {
        this.userHttpService.getUserProfile()
            .subscribe((user: User) => {
                this.user.next(user);
            });
    }
}