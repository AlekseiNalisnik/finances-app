import { Transaction } from "./transaction-interface";
import { Wallet } from "./wallet-interface";

interface DialogData<T> {
    type: "create" | "edit";
    data?: T;
}

export interface WalletDialogData extends DialogData<Wallet> {}
export interface TransactionDialogData extends DialogData<Transaction> {}

export interface WalletDialogRefData extends Partial<Wallet> {}
export interface TransactionDialogRefData extends Partial<Transaction> {}
