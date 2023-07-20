import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WalletComponent } from './pages/wallet/wallet.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { TransactionComponent } from './components/transaction/transaction.component';
import { WalletDataService } from './services/wallet-data.service';
import { WalletHttpService } from './services/wallet-http.service';
import { TransactionHttpService } from './services/transaction-http.service';

@NgModule({
  declarations: [
    WalletComponent,
    TransactionComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    HttpClientModule,
  ],
  providers: [
    WalletDataService,
    WalletHttpService,
    TransactionHttpService,
  ],
})
export class WalletModule { }
