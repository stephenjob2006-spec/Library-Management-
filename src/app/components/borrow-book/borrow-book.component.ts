import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LibraryService } from '../../services/library.service';
import { Book, Member } from '../../models';

@Component({
  selector: 'app-borrow-book',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './borrow-book.component.html',
  styleUrl: './borrow-book.component.scss'
})
export class BorrowBookComponent implements OnInit {
  books: Book[] = [];
  availableBooks: Book[] = [];
  selectedBookId: string = '';
  selectedBook?: Book;
  currentMember?: Member;
  loading = true;
  processing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libraryService: LibraryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
    
    // Check if bookId is passed via query params
    this.route.queryParams.subscribe(params => {
      if (params['bookId']) {
        this.selectedBookId = params['bookId'];
        this.onBookSelect();
      }
    });
  }

  loadData(): void {
    this.loading = true;
    
    this.libraryService.getAllBooks().subscribe(books => {
      this.books = books;
      this.availableBooks = books.filter(book => book.isAvailable());
      this.loading = false;
      
      if (this.selectedBookId) {
        this.onBookSelect();
      }
    });

    this.libraryService.getCurrentMember().subscribe(member => {
      this.currentMember = member;
    });
  }

  onBookSelect(): void {
    this.selectedBook = this.books.find(book => book.id === this.selectedBookId);
  }

  canBorrow(): boolean {
    if (!this.selectedBook || !this.currentMember) return false;
    return this.selectedBook.isAvailable() && this.currentMember.canBorrow();
  }

  getValidationMessage(): string {
    if (!this.selectedBook) return 'Please select a book';
    if (!this.selectedBook.isAvailable()) return 'This book is not available';
    if (!this.currentMember?.canBorrow()) {
      return `You have reached your maximum loan limit (${this.currentMember?.maxLoans} books)`;
    }
    return '';
  }

  borrowBook(): void {
    if (!this.canBorrow() || !this.currentMember) return;

    this.processing = true;
    this.libraryService.borrowBook(this.selectedBookId, this.currentMember.id)
      .subscribe(result => {
        this.processing = false;
        
        if (result.success) {
          this.snackBar.open(result.message, 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          
          // Navigate to return page to show borrowed books
          setTimeout(() => {
            this.router.navigate(['/return']);
          }, 1500);
        } else {
          this.snackBar.open(result.message, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/books']);
  }
}
