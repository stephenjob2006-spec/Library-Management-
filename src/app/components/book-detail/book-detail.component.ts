import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LibraryService } from '../../services/library.service';
import { Book, Member } from '../../models';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent implements OnInit {
  book?: Book;
  currentMember?: Member;
  loading = true;
  bookId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    this.loadBookDetails();
    this.loadCurrentMember();
  }

  loadBookDetails(): void {
    this.loading = true;
    this.libraryService.getBookById(this.bookId).subscribe(book => {
      this.book = book;
      this.loading = false;
    });
  }

  loadCurrentMember(): void {
    this.libraryService.getCurrentMember().subscribe(member => {
      this.currentMember = member;
    });
  }

  borrowBook(): void {
    if (!this.book || !this.currentMember) return;
    
    this.router.navigate(['/borrow'], { queryParams: { bookId: this.book.id } });
  }

  goBack(): void {
    this.router.navigate(['/books']);
  }

  canBorrow(): boolean {
    return !!this.book?.isAvailable() && !!this.currentMember?.canBorrow();
  }

  getBorrowDisabledReason(): string {
    if (!this.book?.isAvailable()) {
      return 'No copies available';
    }
    if (!this.currentMember?.canBorrow()) {
      return 'You have reached your maximum loan limit';
    }
    return '';
  }
}
