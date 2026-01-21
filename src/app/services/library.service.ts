import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Book, Member, Transaction, TransactionStatus, MembershipType, IBook, IMember, ITransaction } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private booksSubject = new BehaviorSubject<Book[]>([]);
  private membersSubject = new BehaviorSubject<Member[]>([]);
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  books$ = this.booksSubject.asObservable();
  members$ = this.membersSubject.asObservable();
  transactions$ = this.transactionsSubject.asObservable();

  private currentMemberId = '1'; // Simulate logged-in member

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Initialize books
    const mockBooks: IBook[] = [
      {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '978-0-7432-7356-5',
        publishedYear: 1925,
        category: 'Classic',
        description: 'A story of the Jazz Age in the United States.',
        coverImage: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
        totalCopies: 5,
        availableCopies: 3
      },
      {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '978-0-06-112008-4',
        publishedYear: 1960,
        category: 'Classic',
        description: 'A novel about racial injustice in the American South.',
        coverImage: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
        totalCopies: 4,
        availableCopies: 2
      },
      {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        isbn: '978-0-452-28423-4',
        publishedYear: 1949,
        category: 'Science Fiction',
        description: 'A dystopian social science fiction novel.',
        coverImage: 'https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg',
        totalCopies: 6,
        availableCopies: 0
      },
      {
        id: '4',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        isbn: '978-0-14-143951-8',
        publishedYear: 1813,
        category: 'Romance',
        description: 'A romantic novel of manners.',
        coverImage: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
        totalCopies: 3,
        availableCopies: 3
      },
      {
        id: '5',
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        isbn: '978-0-316-76948-0',
        publishedYear: 1951,
        category: 'Classic',
        description: 'A story about teenage rebellion and angst.',
        coverImage: 'https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg',
        totalCopies: 4,
        availableCopies: 1
      },
      {
        id: '6',
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        isbn: '978-0-439-70818-8',
        publishedYear: 1997,
        category: 'Fantasy',
        description: 'A young wizard begins his magical education.',
        coverImage: 'https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg',
        totalCopies: 8,
        availableCopies: 5
      }
    ];

    const books = mockBooks.map(b => new Book(b));
    this.booksSubject.next(books);

    // Initialize members
    const mockMembers: IMember[] = [
      {
        id: '1',
        firstName: 'Stephen ',
        lastName: 'Job',
        email: 'stephen.job@email.com',
        phoneNumber: '555-0001',
        membershipDate: new Date('2023-01-15'),
        membershipType: MembershipType.PREMIUM,
        activeLoans: 2,
        maxLoans: 10
      },
      {
        id: '2',
        firstName: 'William',
        lastName: 'Smith',
        email: 'william.smith@email.com',
        phoneNumber: '555-0002',
        membershipDate: new Date('2023-06-20'),
        membershipType: MembershipType.BASIC,
        activeLoans: 1,
        maxLoans: 5
      }
    ];

    const members = mockMembers.map(m => new Member(m));
    this.membersSubject.next(members);

    // Initialize transactions
    const mockTransactions: ITransaction[] = [
      {
        id: '1',
        bookId: '1',
        memberId: '1',
        borrowDate: new Date('2026-01-10'),
        dueDate: new Date('2026-01-24'),
        status: TransactionStatus.ACTIVE
      },
      {
        id: '2',
        bookId: '2',
        memberId: '1',
        borrowDate: new Date('2026-01-05'),
        dueDate: new Date('2026-01-19'),
        status: TransactionStatus.ACTIVE
      },
      {
        id: '3',
        bookId: '3',
        memberId: '2',
        borrowDate: new Date('2025-12-20'),
        dueDate: new Date('2026-01-03'),
        status: TransactionStatus.OVERDUE
      }
    ];

    const transactions = mockTransactions.map(t => new Transaction(t));
    this.transactionsSubject.next(transactions);
  }

  // Book operations
  getAllBooks(): Observable<Book[]> {
    return this.books$.pipe(delay(300)); // Simulate API delay
  }

  getBookById(id: string): Observable<Book | undefined> {
    return this.books$.pipe(
      map(books => books.find(book => book.id === id)),
      delay(300)
    );
  }

  searchBooks(query: string): Observable<Book[]> {
    return this.books$.pipe(
      map(books => books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase())
      )),
      delay(300)
    );
  }

  getBooksByCategory(category: string): Observable<Book[]> {
    return this.books$.pipe(
      map(books => books.filter(book => book.category === category)),
      delay(300)
    );
  }

  // Member operations
  getCurrentMember(): Observable<Member | undefined> {
    return this.members$.pipe(
      map(members => members.find(m => m.id === this.currentMemberId))
    );
  }

  getMemberById(id: string): Observable<Member | undefined> {
    return this.members$.pipe(
      map(members => members.find(m => m.id === id))
    );
  }

  // Transaction operations
  borrowBook(bookId: string, memberId: string): Observable<{ success: boolean; message: string; transaction?: Transaction }> {
    const books = this.booksSubject.value;
    const members = this.membersSubject.value;
    const transactions = this.transactionsSubject.value;

    const book = books.find(b => b.id === bookId);
    const member = members.find(m => m.id === memberId);

    if (!book || !member) {
      return of({ success: false, message: 'Book or member not found' });
    }

    if (!book.isAvailable()) {
      return of({ success: false, message: 'No copies available' });
    }

    if (!member.canBorrow()) {
      return of({ success: false, message: 'Member has reached maximum loan limit' });
    }

    // Create transaction
    const newTransaction = new Transaction({
      id: String(transactions.length + 1),
      bookId,
      memberId,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      status: TransactionStatus.ACTIVE
    });

    // Update book availability
    book.availableCopies--;

    // Update member active loans
    member.activeLoans++;

    // Update subjects
    this.booksSubject.next([...books]);
    this.membersSubject.next([...members]);
    this.transactionsSubject.next([...transactions, newTransaction]);

    return of({ 
      success: true, 
      message: 'Book borrowed successfully', 
      transaction: newTransaction 
    }).pipe(delay(300));
  }

  returnBook(transactionId: string): Observable<{ success: boolean; message: string; fine?: number }> {
    const transactions = this.transactionsSubject.value;
    const books = this.booksSubject.value;
    const members = this.membersSubject.value;

    const transaction = transactions.find(t => t.id === transactionId);

    if (!transaction) {
      return of({ success: false, message: 'Transaction not found' });
    }

    if (transaction.status === TransactionStatus.RETURNED) {
      return of({ success: false, message: 'Book already returned' });
    }

    const book = books.find(b => b.id === transaction.bookId);
    const member = members.find(m => m.id === transaction.memberId);

    if (!book || !member) {
      return of({ success: false, message: 'Book or member not found' });
    }

    // Update transaction
    transaction.returnDate = new Date();
    transaction.status = TransactionStatus.RETURNED;
    const fine = transaction.calculateFine(1);
    transaction.fine = fine;

    // Update book availability
    book.availableCopies++;

    // Update member active loans
    member.activeLoans--;

    // Update subjects
    this.booksSubject.next([...books]);
    this.membersSubject.next([...members]);
    this.transactionsSubject.next([...transactions]);

    return of({ 
      success: true, 
      message: fine > 0 ? `Book returned with a fine of $${fine}` : 'Book returned successfully',
      fine 
    }).pipe(delay(300));
  }

  getActiveTransactionsForMember(memberId: string): Observable<Transaction[]> {
    return this.transactions$.pipe(
      map(transactions => transactions.filter(t => 
        t.memberId === memberId && t.status !== TransactionStatus.RETURNED
      ))
    );
  }

  getCurrentMemberTransactions(): Observable<Transaction[]> {
    return this.getActiveTransactionsForMember(this.currentMemberId);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.transactions$.pipe(delay(300));
  }

  getTransactionWithDetails(transactionId: string): Observable<any> {
    return this.transactions$.pipe(
      map(transactions => {
        const transaction = transactions.find(t => t.id === transactionId);
        if (!transaction) return null;

        const book = this.booksSubject.value.find(b => b.id === transaction.bookId);
        const member = this.membersSubject.value.find(m => m.id === transaction.memberId);

        return {
          transaction,
          book,
          member
        };
      })
    );
  }
}
