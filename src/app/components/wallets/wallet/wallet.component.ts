import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { WalletDataService } from 'src/app/services/data/wallet-data.service';
import { WalletModalComponent } from '../wallet-modal/wallet-modal.component';
import { WalletDialogRefData } from 'src/app/interfaces/dialog-interface';

@Component({
  selector: 'app-wallet',
  standalone: true,
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  imports: [CommonModule, DialogModule, MatButtonModule, FlexLayoutModule, MatIconModule, RouterModule],
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

  private getWallets(): void {
    this.walletDataService.getWallets();
  }
}
