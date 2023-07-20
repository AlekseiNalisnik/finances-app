import { Routes } from "@angular/router";

import { LoginComponent } from "./components/auth/login/login.component";
import { RegistrationComponent } from "./components/auth/registration/registration.component";
import { WalletComponent } from "./components/wallet/wallet.component";
import { authGuard } from "./guards/auth.guard";

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'wallets', pathMatch: 'full' },
    { path: 'wallets', component: WalletComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent }
];
