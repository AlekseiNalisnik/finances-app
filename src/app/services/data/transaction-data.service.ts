import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { TransactionHttpService } from '../http/transaction-http.service';
import {
  Transaction,
  TransactionPaymentType,
  TransactionPaymentTypeDictionary,
  TransactionPurposeDictionary,
} from 'src/app/interfaces/transaction-interface';

const TRANSACTION_PAYMENT_TYPES: TransactionPaymentTypeDictionary[] = [
  { value: TransactionPaymentType.CASH, viewValue: 'Наличные' },
  { value: TransactionPaymentType.CREDIT_CARD, viewValue: 'Кредитная карта' },
  { value: TransactionPaymentType.CRYPTO_CURRENCY, viewValue: 'Криптовалюта' },
  { value: TransactionPaymentType.DIGITAL_CURRENCY, viewValue: 'Цифровая валюта' },
];

@Injectable()
export class TransactionDataService {
  private transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);
  private transactionPurposeDictionaries = new BehaviorSubject<TransactionPurposeDictionary[]>([]);

  public getTransactionList(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }

  public getTransactionPurposeDictionaryList(): Observable<TransactionPurposeDictionary[]> {
    return this.transactionPurposeDictionaries.asObservable();
  }

  public getTransactionPaymentTypeDictionaryList(): TransactionPaymentTypeDictionary[] {
    return TRANSACTION_PAYMENT_TYPES;
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

  public getTransactionPurposeDictionaries(): void {
    this.transactionHttpService.getTransactionPurposeDictionaries().pipe(
      tap((transactionPurposeDictionaries) => {
        this.transactionPurposeDictionaries.next(transactionPurposeDictionaries);
      }),
    ).subscribe();
  }
}
