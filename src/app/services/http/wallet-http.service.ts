import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '../../interfaces/wallet-interface';
import { WalletDialogRefData } from '../../interfaces/dialog-interface';

@Injectable({
  providedIn: 'root',
})
export class WalletHttpService {
  private readonly walletUrl = '/api/finances/secured/wallets';

  constructor(private http: HttpClient) { }

  public getWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.walletUrl);
  }

  public getWalletById(id: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.walletUrl}/${id}`);
  }

  public createWallet(wallet: WalletDialogRefData): Observable<Wallet> {
    return this.http.post<Wallet>(`${this.walletUrl}/create`, wallet);
  }

  public editWallet(wallet: WalletDialogRefData): Observable<void> {
    return this.http.put<void>(`${this.walletUrl}/update`, wallet);
  }

  public deleteWallet(id: string): Observable<void> {
    return this.http.delete<void>(`${this.walletUrl}/delete/${id}`);
  }
}
