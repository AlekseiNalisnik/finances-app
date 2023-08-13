import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';

import { WalletDataService } from 'src/app/services/data/wallet-data.service';
import { Wallet } from 'src/app/interfaces/wallet-interface';
import { WalletModalComponent } from '../wallet-modal/wallet-modal.component';
import { TransactionComponent } from '../../transactions/transaction/transaction.component';

@Component({
  selector: 'app-wallet-card',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DialogModule,
    TransactionComponent,
  ],
  templateUrl: './wallet-card.component.html',
  styleUrls: ['./wallet-card.component.scss']
})
export class WalletCardComponent implements OnInit {
  wallet: Wallet | null = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly walletDataService: WalletDataService,
    private readonly dialog: Dialog,
  ) {}

  public ngOnInit(): void {
    this.getCurrentWallet();
  }

  public deleteWallet(): void {
    this.walletDataService.deleteWallet(this.wallet!.id);
  }

  public editWallet(): void {
    const dialogRef = this.dialog.open<Wallet>(WalletModalComponent, {
      data: {
        type: "edit",
        data: this.wallet,
      },
    });

    dialogRef.closed.subscribe((wallet: Wallet | undefined) => {
      if (wallet) {
        this.walletDataService.editWallet(wallet);
      }
    });
  }

  private getCurrentWallet(): void {
    this.activatedRoute.params.subscribe(params => {
      this.walletDataService.getWalletById(params['id']);
    });

    this.walletDataService.getWallet().subscribe(wallet => {
      this.wallet = wallet;
    });
  }
}
