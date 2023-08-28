import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';

import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';
import { TransactionDataService } from 'src/app/services/data/transaction-data.service';
import { TransactionHttpService } from 'src/app/services/http/transaction-http.service';
import { Transaction, TransactionPaymentTypeDictionary, TransactionPurposeDictionary } from 'src/app/interfaces/transaction-interface';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
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
    MatNativeDateModule,
    DialogModule,
    TransactionComponent,
    MatMenuModule,
  ],
  providers: [
    TransactionDataService,
    TransactionHttpService,
  ],
})
export class TransactionComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  transactions: Transaction[] = [];
  transactionPurposeDictionaries: TransactionPurposeDictionary[] = [];
  transactionPaymentTypeDictionaries: TransactionPaymentTypeDictionary[] = [];
  private walletId: string | undefined;

  constructor(
    private readonly transactionDataService: TransactionDataService,
    private readonly dialog: Dialog,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.getDictionaries();
    this.getWalletId();
  }

  public createTransaction(): void {
    const dialogRef = this.dialog.open<Transaction>(TransactionModalComponent, {
      data: {
        type: "create",
        data: {
          dictionaries: {
            purpose: this.transactionPurposeDictionaries,
            paymentType: this.transactionPaymentTypeDictionaries,
          },
        },
      },
    });

    dialogRef.closed.subscribe((transaction: Transaction | undefined) => {
      if (transaction) {
        this.transactionDataService.createTransaction(this.walletId!, transaction);
      }
    });
  }

  public editTransaction(id: string): void {
    const dialogRef = this.dialog.open<Transaction>(TransactionModalComponent, {
      data: {
        type: "edit",
        data: {
          dictionaries: {
            purpose: this.transactionPurposeDictionaries,
            paymentType: this.transactionPaymentTypeDictionaries,
          },
          data: this.transactions.find(({ id: transactionId }) => transactionId === id),
        },
      },
    });

    dialogRef.closed.subscribe((transaction: Transaction | undefined) => {
      if (transaction) {
        this.transactionDataService.editTransaction(transaction);
      }
    });
  }

  public removeTransaction(id: string): void {
    this.transactionDataService.deleteTransaction(this.walletId!, id);
  }

  private getTransactions(): void {
    this.transactionDataService.getTransactions(this.walletId!);

    this.transactionDataService.getTransactionList()
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
      });
  }

  private getDictionaries(): void {
    this.transactionDataService.getTransactionPurposeDictionaries();

    this.transactionDataService.getTransactionPurposeDictionaryList()
      .subscribe((transactionPurposeDictionaries: TransactionPurposeDictionary[]) => {
        this.transactionPurposeDictionaries = transactionPurposeDictionaries;
      });

    this.transactionPaymentTypeDictionaries = this.transactionDataService.getTransactionPaymentTypeDictionaryList();
  }

  private getWalletId(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.walletId = id;

      this.getTransactions();
    });
  }
}
