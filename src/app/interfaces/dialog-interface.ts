export interface WalletDialogData {
    type: "create" | "edit";
}

export interface WalletDialogRefData {
    id?: string;
    name: string;
    balance: string;
    description: string;
}
