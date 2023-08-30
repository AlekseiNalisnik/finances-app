import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { TransactionHttpService } from '../http/transaction-http.service';
import {
  GroupedByDateTransactions,
  PaginationOptions,
  Transaction,
  TransactionPaymentType,
  TransactionPaymentTypeDictionary,
  TransactionPurposeDictionary,
  TransactionResponse,
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
  private paginationOptions = new BehaviorSubject<PaginationOptions>({ pageNumber: 0, pageSize: 10 });
  private totalPages = new BehaviorSubject<number>(0);

  public getTransactionList(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }

  public getTransactionPurposeDictionaryList(): Observable<TransactionPurposeDictionary[]> {
    return this.transactionPurposeDictionaries.asObservable();
  }

  public getTransactionPaymentTypeDictionaryList(): TransactionPaymentTypeDictionary[] {
    return TRANSACTION_PAYMENT_TYPES;
  }

  public setPaginationOptions(options: PaginationOptions): void {
    this.paginationOptions.next(options);
  }

  public getTotalPages(): Observable<number> {
    return this.totalPages.asObservable();
  }

  constructor(
    private readonly transactionHttpService: TransactionHttpService,
  ) { }

  public getTransactions(walletId: string): void {
    this.transactionHttpService.getTransactions(walletId, this.paginationOptions.value).pipe(
      tap(({ transactions, totalPages }: TransactionResponse) => {
        this.transactions.next(transactions);
        this.totalPages.next(totalPages);
      })
    ).subscribe();
  }

  public createTransaction(walletId: string, transaction: Transaction): void {
    this.transactionHttpService.createTransaction(walletId, transaction).pipe(
      tap(() => {
        this.getTransactions(walletId);
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

  public deleteTransaction(walletId: string, id: string): void {
    this.transactionHttpService.deleteTransaction(walletId, id).pipe(
      tap(() => {
        this.getTransactions(walletId);
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

  public groupTransactionsByDate(): GroupedByDateTransactions[] {
    const groupedByDateTransactions: GroupedByDateTransactions[] = [];

    this.transactions.value.forEach((transaction, index) => {
      if (index === 0 || transaction.dateCreated !== this.transactions.value[index - 1].dateCreated) {
        groupedByDateTransactions.push({
          date: transaction.dateCreated,
          transactions: [transaction],
        });
      } else {
        groupedByDateTransactions[groupedByDateTransactions.length - 1].transactions.push(transaction);
      }
    });

    return groupedByDateTransactions;
  }
}
