import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LibraryService } from '../../services/library.service';
import { Book } from '../../models';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Classic', 'Science Fiction', 'Romance', 'Fantasy'];
  loading = true;

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.libraryService.getAllBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = books;
      this.loading = false;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.books;

    // Apply category filter
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(book => book.category === this.selectedCategory);
    }

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query)
      );
    }

    this.filteredBooks = filtered;
  }

  getAvailabilityClass(book: Book): string {
    if (book.availableCopies === 0) return 'unavailable';
    if (book.availableCopies <= 2) return 'low-stock';
    return 'available';
  }

  getAvailabilityText(book: Book): string {
    if (book.availableCopies === 0) return 'Not Available';
    if (book.availableCopies === 1) return '1 copy available';
    return `${book.availableCopies} copies available`;
  }
}
