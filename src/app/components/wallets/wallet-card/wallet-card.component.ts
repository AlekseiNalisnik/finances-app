import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { WalletDataService } from 'src/app/services/data/wallet-data.service';
import { Wallet } from 'src/app/interfaces/wallet-interface';
import { WalletModalComponent } from '../wallet-modal/wallet-modal.component';

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
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    MatNativeDateModule,
    DialogModule,
  ],
  templateUrl: './wallet-card.component.html',
  styleUrls: ['./wallet-card.component.scss']
})
export class WalletCardComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
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
    const dialogRef = this.dialog.open(WalletModalComponent, {
      data: {
        type: "edit",
        data: this.wallet,
      },
    });

    dialogRef.closed.subscribe((wallet: any) => {
      this.walletDataService.editWallet(wallet);
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
