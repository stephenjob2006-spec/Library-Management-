# Library Management System

A comprehensive Library Management System built with Angular 18 and TypeScript that allows users to browse available books, view details, borrow or return books, and manage library records.

## 🚀 Features

### Core Functionality
- **Browse Books**: View all available books with search and category filtering
- **Book Details**: Detailed information about each book including availability status
- **Borrow Books**: Interactive form to borrow available books with validation
- **Return Books**: Manage and return borrowed books with fine calculation
- **Member Dashboard**: View active loans, membership status, and available slots

### Technical Features
- Component-based architecture using Angular 18
- TypeScript classes and interfaces for strong typing
- Reactive programming with RxJS
- Angular Material UI components
- Routing with lazy loading support
- Mock data service simulating backend API
- Responsive design for mobile and desktop
- 
### Preview
[Click Here](https://library-management-hr8g.vercel.app/books)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (`npm install -g @angular/cli`)

## 🛠️ Installation & Running

1. Navigate to the project directory:
```bash
cd C:\Library
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Start the development server:
```bash
ng serve --open
```

The application will open automatically in your default browser at `http://localhost:4200/`

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/              # Navigation bar component
│   │   ├── book-list/           # Browse books with search/filter
│   │   ├── book-detail/         # Detailed book information
│   │   ├── borrow-book/         # Book borrowing interface
│   │   └── return-book/         # Book return management
│   ├── models/
│   │   ├── book.model.ts        # Book class and interface
│   │   ├── member.model.ts      # Member class and interface
│   │   ├── transaction.model.ts # Transaction class and interface
│   │   └── index.ts             # Model exports
│   ├── services/
│   │   └── library.service.ts   # Core library operations service
│   ├── app.component.*          # Root component
│   ├── app.config.ts            # App configuration
│   └── app.routes.ts            # Routing configuration
└── styles.scss                   # Global styles
```

## 🎨 Key Components

### 1. Book List Component
- Grid layout displaying all books
- Search functionality by title, author, or ISBN
- Category filtering (Classic, Science Fiction, Romance, Fantasy)
- Real-time availability status
- Direct links to book details and borrowing

### 2. Book Detail Component
- Comprehensive book information
- Cover image and metadata
- Availability visualization with progress bar
- Member loan status
- Quick borrow action

### 3. Borrow Book Component
- Interactive book selection dropdown
- Member information display
- Real-time validation
- Success/error notifications
- Automatic navigation after successful borrow

### 4. Return Book Component
- Active loans dashboard
- Due date tracking with status indicators
- Overdue warnings with fine calculation
- One-click return functionality
- Transaction history

### 5. Navbar Component
- Global navigation
- Active loans badge indicator
- Member profile display
- Responsive mobile menu

## 📚 Data Models

### Book
```typescript
interface IBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  category: string;
  description: string;
  coverImage: string;
  totalCopies: number;
  availableCopies: number;
}
```

### Member
```typescript
interface IMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  membershipDate: Date;
  membershipType: MembershipType;
  activeLoans: number;
  maxLoans: number;
}
```

### Transaction
```typescript
interface ITransaction {
  id: string;
  bookId: string;
  memberId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: TransactionStatus;
  fine?: number;
}
```

## 🔧 Technologies Used

### Frontend Framework
- **Angular 18**: Latest version with standalone components
- **TypeScript 5.x**: Strong typing and modern JavaScript features
- **RxJS**: Reactive programming with Observables

### UI Library
- **Angular Material 18**: Comprehensive Material Design components
  - Cards, Buttons, Icons
  - Form Fields, Select, Input
  - Progress Spinners, Progress Bars
  - Chips, Badges, Snackbars
  - Tables, Dividers

### Styling
- **SCSS**: Enhanced CSS with variables and nesting
- **Responsive Design**: Mobile-first approach
- **Custom Themes**: Indigo-Pink Material theme

## 🎯 Angular & TypeScript Concepts Demonstrated

### Angular Features
✅ Component-based architecture  
✅ Standalone components (Angular 18)  
✅ Dependency injection  
✅ Services for business logic  
✅ Routing with parameters and query params  
✅ Data binding (property, event, two-way)  
✅ Directives (*ngIf, *ngFor, [ngClass], [ngStyle])  
✅ Form validation  
✅ HTTP service pattern (simulated)  

### TypeScript Features
✅ Interfaces for type safety  
✅ Classes with inheritance  
✅ Access modifiers (public, private)  
✅ Enums for constants  
✅ Generic types  
✅ Optional chaining  
✅ Type inference  

## 🌟 Sample Data

The application comes with pre-loaded sample data:

**Books (6 titles):**
- The Great Gatsby by F. Scott Fitzgerald
- To Kill a Mockingbird by Harper Lee
- 1984 by George Orwell
- Pride and Prejudice by Jane Austen
- The Catcher in the Rye by J.D. Salinger
- Harry Potter and the Sorcerer's Stone by J.K. Rowling

**Current Member:** John Doe (Premium membership, 2 active loans)

## 📱 Responsive Design

Fully responsive and works on:
- Desktop (1400px+)
- Tablet (768px - 1400px)
- Mobile (< 768px)

## 🐛 Troubleshooting

### Port already in use
```bash
ng serve --port 4201
```

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear Angular cache
```bash
ng cache clean
```

## 📖 Learning Resources

- [Angular Documentation](https://angular.dev)
- [Angular Material](https://material.angular.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev)

## 👨‍💻 Development Commands

### Run development server
```bash
ng serve
```

### Build for production
```bash
ng build --configuration production
```

### Generate new component
```bash
ng generate component component-name
```

---

**Built with ❤️ using Angular 18 and TypeScript**
