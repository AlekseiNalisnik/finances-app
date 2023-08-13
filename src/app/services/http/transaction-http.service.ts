import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Transaction } from 'src/app/interfaces/transaction-interface';

@Injectable()
export class TransactionHttpService {
  private readonly transactionUrl = '/api/finances/secured/transactions';

  constructor(private http: HttpClient) { }

  public getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionUrl);
  }

  public getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.transactionUrl}/${id}`);
  }

  public createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.transactionUrl}/create`, transaction);
  }

  public editTransaction(transaction: Transaction): Observable<void> {
    return this.http.put<void>(`${this.transactionUrl}/update`, transaction);
  }

  public deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.transactionUrl}/delete/${id}`);
  }
}
