import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '../interfaces/wallet-interface';

@Injectable()
export class WalletHttpService {
  private readonly walletUrl = '/api/wallets';

  constructor(private http: HttpClient) { }

  public getWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.walletUrl);
  }

  public getWalletById(id: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.walletUrl}/${id}`);
  }
}
