import { Injectable } from '@angular/core';
import { WalletHttpService } from './wallet-http.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Wallet } from '../interfaces/wallet-interface';

@Injectable()
export class WalletDataService {
  private wallets: BehaviorSubject<Wallet[]> = new BehaviorSubject<Wallet[]>([]);
  private wallet: BehaviorSubject<Wallet | null> = new BehaviorSubject<Wallet | null>(null);

  public getWalletList(): Observable<Wallet[]> {
    return this.wallets.asObservable();
  }

  public getWallet(): Observable<Wallet | null> {
    return this.wallet.asObservable();
  }

  constructor(private readonly walletHttpService: WalletHttpService) { }

  public getWallets(): void {
    this.walletHttpService.getWallets().pipe(
      tap((wallets: Wallet[]) => {
        this.wallets.next(wallets);
      })
    );
  }

  public getWalletById(id: string): void {
    this.walletHttpService.getWalletById(id).pipe(
      tap((wallet: Wallet) => {
        this.wallet.next(wallet);
      }),
    );
  }
}
