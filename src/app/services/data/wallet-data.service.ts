import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { WalletHttpService } from '../http/wallet-http.service';
import { Wallet } from '../../interfaces/wallet-interface';
import { WalletDialogRefData } from '../../interfaces/dialog-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WalletDataService {
  private wallets: BehaviorSubject<Wallet[]> = new BehaviorSubject<Wallet[]>([]);
  private wallet: BehaviorSubject<Wallet | null> = new BehaviorSubject<Wallet | null>(null);

  public getWalletList(): Observable<Wallet[]> {
    return this.wallets.asObservable();
  }

  public getWallet(): Observable<Wallet | null> {
    return this.wallet.asObservable();
  }

  constructor(
    private readonly walletHttpService: WalletHttpService,
    private readonly router: Router,
  ) { }

  public getWallets(): void {
    this.walletHttpService.getWallets().pipe(
      tap((wallets: Wallet[]) => {
        this.wallets.next(wallets);
      })
    ).subscribe();
  }

  public getWalletById(id: string): void {
    this.walletHttpService.getWalletById(id).pipe(
      tap((wallet: Wallet) => {
        this.wallet.next(wallet);
      }),
    ).subscribe();
  }

  public createWallet(wallet: WalletDialogRefData): void {
    this.walletHttpService.createWallet(wallet).pipe(
      tap((createdWallet) => {
        this.wallets.next([...this.wallets.value, { ...createdWallet }]);
      }),
    ).subscribe();
  }

  public editWallet(wallet: Wallet): void {
    this.walletHttpService.editWallet(wallet).pipe(
      tap(() => {
        this.wallets.next([...this.wallets.value, { ...wallet }]);
      }),
    ).subscribe();
  }

  public deleteWallet(id: string): void {
    this.walletHttpService.deleteWallet(id).pipe(
      tap(() => {
        this.wallets.next([...this.wallets.value.filter(({ id: walletId }) => id !== walletId)]);
        this.router.navigateByUrl('/wallets');
      }),
    ).subscribe();
  }
}
