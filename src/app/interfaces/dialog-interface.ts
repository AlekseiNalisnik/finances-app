import { Wallet } from "./wallet-interface";

export interface WalletDialogData {
    type: "create" | "edit";
    data?: Wallet;
}

export interface WalletDialogRefData {
    id?: string;
    name: string;
    balance: string;
    description: string;
}
