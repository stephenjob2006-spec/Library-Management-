import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LibraryService } from '../../services/library.service';
import { Book, Transaction, Member, TransactionStatus } from '../../models';

@Component({
  selector: 'app-return-book',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.scss'
})
export class ReturnBookComponent implements OnInit {
  activeTransactions: Array<{transaction: Transaction, book: Book}> = [];
  currentMember?: Member;
  loading = true;
  processingTransactionId: string = '';
  displayedColumns: string[] = ['cover', 'title', 'borrowDate', 'dueDate', 'status', 'actions'];

  constructor(
    private libraryService: LibraryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    
    this.libraryService.getCurrentMember().subscribe(member => {
      this.currentMember = member;
      if (member) {
        this.loadActiveTransactions();
      }
    });
  }

  loadActiveTransactions(): void {
    this.libraryService.getCurrentMemberTransactions().subscribe(transactions => {
      // Get books for each transaction
      this.activeTransactions = [];
      transactions.forEach(transaction => {
        this.libraryService.getBookById(transaction.bookId).subscribe(book => {
          if (book) {
            this.activeTransactions.push({ transaction, book });
          }
        });
      });
      this.loading = false;
    });
  }

  returnBook(transactionId: string): void {
    this.processingTransactionId = transactionId;
    
    this.libraryService.returnBook(transactionId).subscribe(result => {
      this.processingTransactionId = '';
      
      if (result.success) {
        let message = result.message;
        if (result.fine && result.fine > 0) {
          message = `Book returned. Fine: $${result.fine.toFixed(2)}`;
        }
        
        this.snackBar.open(message, 'Close', {
          duration: 5000,
          panelClass: result.fine && result.fine > 0 ? ['warning-snackbar'] : ['success-snackbar']
        });
        
        // Reload data
        this.loadData();
      } else {
        this.snackBar.open(result.message, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  getDaysUntilDue(dueDate: Date): number {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isOverdue(transaction: Transaction): boolean {
    return transaction.isOverdue();
  }

  getStatusColor(transaction: Transaction): string {
    if (transaction.isOverdue()) return 'warn';
    const daysUntilDue = this.getDaysUntilDue(transaction.dueDate);
    if (daysUntilDue <= 3) return 'accent';
    return 'primary';
  }

  getStatusText(transaction: Transaction): string {
    if (transaction.isOverdue()) {
      const daysOverdue = transaction.getDaysOverdue();
      return `Overdue by ${daysOverdue} day${daysOverdue > 1 ? 's' : ''}`;
    }
    const daysUntilDue = this.getDaysUntilDue(transaction.dueDate);
    if (daysUntilDue === 0) return 'Due Today';
    if (daysUntilDue === 1) return 'Due Tomorrow';
    return `Due in ${daysUntilDue} days`;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
