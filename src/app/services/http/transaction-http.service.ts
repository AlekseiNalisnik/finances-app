import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  PaginationOptions,
  Transaction,
  TransactionPurposeDictionary,
  TransactionResponse,
} from 'src/app/interfaces/transaction-interface';

@Injectable()
export class TransactionHttpService {
  private readonly transactionUrl = '/api/finances/secured/transactions';
  private readonly transactionDictionaryUrl = '/api/finances/secured/dictionaries/transaction-purpose';

  constructor(private http: HttpClient) { }

  public getTransactions(walletId: string, { pageNumber, pageSize }: PaginationOptions): Observable<TransactionResponse> {
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);

    return this.http.get<TransactionResponse>(`${this.transactionUrl}/${walletId}/list`, { params });
  }

  public createTransaction(walletId: string, transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.transactionUrl}/${walletId}/create`, transaction);
  }

  public editTransaction(transaction: Transaction): Observable<void> {
    return this.http.put<void>(`${this.transactionUrl}/update`, transaction);
  }

  public deleteTransaction(walletId: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.transactionUrl}/${walletId}/delete/${id}`);
  }

  public getTransactionPurposeDictionaries(): Observable<TransactionPurposeDictionary[]> {
    return this.http.get<TransactionPurposeDictionary[]>(this.transactionDictionaryUrl);
  }
}
