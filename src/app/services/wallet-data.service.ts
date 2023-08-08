import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { WalletHttpService } from './wallet-http.service';
import { Wallet } from '../interfaces/wallet-interface';
import { WalletDialogRefData } from '../interfaces/dialog-interface';

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

  public createWallet(wallet: WalletDialogRefData): void {
    this.walletHttpService.createWallet(wallet).pipe(
      tap(({ id }) => {
        this.wallets.next([...this.wallets.value, { id, ...wallet }]);
      }),
    );
  }

  public editWallet(wallet: Wallet): void {
    this.walletHttpService.editWallet(wallet).pipe(
      tap(() => {
        this.wallets.next([...this.wallets.value, { ...wallet }]);
      }),
    );
  }

  public deleteWallet(id: string): void {
    this.walletHttpService.deleteWallet(id).pipe(
      tap(() => {
        this.wallets.next([...this.wallets.value.filter(({ id: walletId }) => id !== walletId)]);
      }),
    );
  }
}
