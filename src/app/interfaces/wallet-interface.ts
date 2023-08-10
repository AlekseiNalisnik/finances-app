import { WalletDialogRefData } from "./dialog-interface";

export interface Wallet extends Required<WalletDialogRefData> {
    dateCreated: string;
}
