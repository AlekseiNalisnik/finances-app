import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { TransactionHttpService } from '../http/transaction-http.service';
import { Transaction } from 'src/app/interfaces/transaction-interface';

@Injectable()
export class TransactionDataService {
  private transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);

  public getTransactionList(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }

  constructor(
    private readonly transactionHttpService: TransactionHttpService,
  ) { }

  public getTransactions(): void {
    this.transactionHttpService.getTransactions().pipe(
      tap((transactions: Transaction[]) => {
        this.transactions.next(transactions);
      })
    ).subscribe();
  }

  public createTransaction(transaction: Transaction): void {
    this.transactionHttpService.createTransaction(transaction).pipe(
      tap((createdTransaction) => {
        this.transactions.next([...this.transactions.value, { ...createdTransaction }]);
      }),
    ).subscribe();
  }

  public editTransaction(transaction: Transaction): void {
    this.transactionHttpService.editTransaction(transaction).pipe(
      tap(() => {
        this.transactions.next([...this.transactions.value, { ...transaction }]);
      }),
    ).subscribe();
  }

  public deleteTransaction(id: string): void {
    this.transactionHttpService.deleteTransaction(id).pipe(
      tap(() => {
        this.transactions.next(
          [...this.transactions.value.filter(({ id: transactionId }) => id !== transactionId)]
        );
      }),
    ).subscribe();
  }
}
