export interface IBook {
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

export class Book implements IBook {
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

  constructor(data: IBook) {
    this.id = data.id;
    this.title = data.title;
    this.author = data.author;
    this.isbn = data.isbn;
    this.publishedYear = data.publishedYear;
    this.category = data.category;
    this.description = data.description;
    this.coverImage = data.coverImage;
    this.totalCopies = data.totalCopies;
    this.availableCopies = data.availableCopies;
  }

  isAvailable(): boolean {
    return this.availableCopies > 0;
  }

  getAvailabilityPercentage(): number {
    return (this.availableCopies / this.totalCopies) * 100;
  }
}
