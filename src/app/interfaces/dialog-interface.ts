import { Transaction, TransactionPaymentTypeDictionary, TransactionPurposeDictionary } from "./transaction-interface";
import { Wallet } from "./wallet-interface";

interface DialogData<T> {
    type: "create" | "edit";
    data?: T;
}

export interface WalletDialogData extends DialogData<Wallet> {}
export interface TransactionDialogData extends Omit<DialogData<Transaction>, 'data'> {
    data: {
        dictionaries: {
            purpose: TransactionPurposeDictionary[];
            paymentType: TransactionPaymentTypeDictionary[];
        };
        data?: Transaction;
    };
}

export interface WalletDialogRefData extends Partial<Wallet> {}
export interface TransactionDialogRefData extends Partial<Transaction> {}
