import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';

import { WalletDataService } from 'src/app/services/wallet-data.service';
import { WalletHttpService } from 'src/app/services/wallet-http.service';
import { WalletModalComponent } from '../wallet-modal/wallet-modal.component';
import { WalletDialogRefData } from 'src/app/interfaces/dialog-interface';

@Component({
  selector: 'app-wallet',
  standalone: true,
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  imports: [CommonModule, DialogModule, MatButtonModule],
  providers: [WalletDataService, WalletHttpService],
})
export class WalletComponent implements OnInit {
  constructor(
    public readonly walletDataService: WalletDataService,
    private readonly dialog: Dialog,
  ) {}

  public ngOnInit(): void {
    this.getWallets();
  }

  public createWallet(): void {
    const dialogRef = this.dialog.open(WalletModalComponent, {
      data: { type: "create" },
    });

    dialogRef.closed.subscribe((wallet: any) => {
      this.walletDataService.createWallet(wallet);
    });
  }

  public editWallet(): void {
    const dialogRef = this.dialog.open(WalletModalComponent, {
      data: { type: "edit" },
    });

    dialogRef.closed.subscribe((wallet: any) => {
      this.walletDataService.editWallet(wallet);
    });
  }

  public deleteWallet(id: string): void {
    this.walletDataService.deleteWallet(id);
  }

  private getWallets(): void {
    this.walletDataService.getWallets();
  }
}
