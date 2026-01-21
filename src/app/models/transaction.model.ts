export interface ITransaction {
  id: string;
  bookId: string;
  memberId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: TransactionStatus;
  fine?: number;
}

export enum TransactionStatus {
  ACTIVE = 'ACTIVE',
  RETURNED = 'RETURNED',
  OVERDUE = 'OVERDUE'
}

export class Transaction implements ITransaction {
  id: string;
  bookId: string;
  memberId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: TransactionStatus;
  fine?: number;

  constructor(data: ITransaction) {
    this.id = data.id;
    this.bookId = data.bookId;
    this.memberId = data.memberId;
    this.borrowDate = data.borrowDate;
    this.dueDate = data.dueDate;
    this.returnDate = data.returnDate;
    this.status = data.status;
    this.fine = data.fine;
  }

  isOverdue(): boolean {
    if (this.status === TransactionStatus.RETURNED) {
      return false;
    }
    return new Date() > new Date(this.dueDate);
  }

  getDaysOverdue(): number {
    if (!this.isOverdue()) {
      return 0;
    }
    const today = new Date();
    const due = new Date(this.dueDate);
    const diffTime = Math.abs(today.getTime() - due.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  calculateFine(finePerDay: number = 1): number {
    const daysOverdue = this.getDaysOverdue();
    return daysOverdue * finePerDay;
  }
}
