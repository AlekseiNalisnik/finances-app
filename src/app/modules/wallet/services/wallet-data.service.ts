import { Injectable } from '@angular/core';

@Injectable()
export class WalletDataService {

  constructor(private readonly WalletHttpService walletHttpService) { }
}
