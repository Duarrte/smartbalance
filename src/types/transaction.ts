export type TransactionType = 'in' | 'out';

export interface Transaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: TransactionType;
}