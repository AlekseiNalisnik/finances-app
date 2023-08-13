import { WalletDialogRefData } from "./dialog-interface";

export interface Wallet {
    id: string;
    dateCreated: string;
    name: string;
    balance: string;
    description: string;
}
