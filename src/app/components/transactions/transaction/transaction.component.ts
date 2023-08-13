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

import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';
import { TransactionDataService } from 'src/app/services/data/transaction-data.service';
import { TransactionHttpService } from 'src/app/services/http/transaction-http.service';
import { Transaction } from 'src/app/interfaces/transaction-interface';

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

  constructor(
    private readonly transactionDataService: TransactionDataService,
    private readonly dialog: Dialog,
  ) {}

  public ngOnInit(): void {
    this.getTransactions();
  }

  public createTransaction(): void {
    const dialogRef = this.dialog.open<Transaction>(TransactionModalComponent, {
      data: {
        type: "create",
      },
    });

    dialogRef.closed.subscribe((transaction: Transaction | undefined) => {
      if (transaction) {
        this.transactionDataService.createTransaction(transaction);
      }
    });
  }

  public editTransaction(): void {
    const dialogRef = this.dialog.open<Transaction>(TransactionModalComponent, {
      data: {
        type: "edit",
        data: null,
      },
    });

    dialogRef.closed.subscribe((transaction: Transaction | undefined) => {
      if (transaction) {
        this.transactionDataService.editTransaction(transaction);
      }
    });
  }

  public removeTransaction(id: string): void {
    this.transactionDataService.deleteTransaction(id);
  }

  public getTransactions(): void {
    this.transactionDataService.getTransactions();

    this.transactionDataService.getTransactionList()
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
      })
  }
}
