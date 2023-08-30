export interface Transaction {
    id?: string;
    purchasePlace: string;
    paymentType: string;
    price: number;
    dateCreated: string;
    description?: string;
    purposeId?: string;
    purpose: {
        id: string;
        code: number;
        description: string;
    };
}

export interface TransactionResponse {
    totalPages: number;
    transactions: Transaction[];
}

export enum TransactionPaymentType {
    CASH = 'CASH',
    CREDIT_CARD = 'CREDIT_CARD',
    CRYPTO_CURRENCY = 'CRYPTO_CURRENCY',
    DIGITAL_CURRENCY = 'DIGITAL_CURRENCY',
}

export interface TransactionPaymentTypeDictionary {
    value: TransactionPaymentType,
    viewValue: string;
}

export interface TransactionPurposeDictionary {
    id: string;
    code: number;
    description: string;
}

export interface PaginationOptions {
    pageNumber: number;
    pageSize: number;
}

export interface GroupedByDateTransactions {
    date: string;
    transactions: Transaction[];
}