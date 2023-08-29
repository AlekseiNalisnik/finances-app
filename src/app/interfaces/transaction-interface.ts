export interface Transaction {
    id?: string;
    purchasePlace: string;
    paymentType: string;
    price: number;
    dateCreated: Date;
    description?: string;
    purposeId?: string;
    purpose: {
        id: string;
        code: number;
        description: string;
    };
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