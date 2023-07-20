import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WalletComponent } from "./pages/wallet/wallet.component";

const routes: Routes = [
    {
        path: 'wallets',
        component: WalletComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WalletRoutingModule {}
