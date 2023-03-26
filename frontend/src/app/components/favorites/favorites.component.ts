import {Component} from '@angular/core';
import {Book} from "../../models/book";
import {Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  dataSource = new MatTableDataSource<Book>();
  deleteDialogRef!: MatDialogRef<DeleteDialogComponent>;

  constructor(
    public dialog: MatDialog
  ) {}


  selectedStatus: string = '';
  searchTerm: string = '';



  ngOnInit(): void {
    this.loadBooksFromLocalStorage();
  }

  applyFilter() {
    this.dataSource.filter = this.selectedStatus;
  }
  applySearch() {
    this.dataSource.filterPredicate = (data: Book, filter: string) => {
      return data.title.toLowerCase().includes(filter) ||
        data.author.toLowerCase().includes(filter) ||
        data.genre.toLowerCase().includes(filter) ||
        data.year.toString().includes(filter)
    };
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  loadBooksFromLocalStorage() {
    const books = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.dataSource.data = books;
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'author': return this.compare(a.author, b.author, isAsc);
        case 'genre': return this.compare(a.genre, b.genre, isAsc);
        case 'year': return this.compare(a.year, b.year, isAsc);
        case 'added': return this.compare(a.added, b.added, isAsc);
        case 'checkOutCount': return this.compare(a.checkOutCount, b.checkOutCount, isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        case 'dueDate': return this.compare(a.dueDate, b.dueDate, isAsc);
        default: return 0;
      }
    });
  }

  isOverdue(date: string): boolean {
    const dueDate = new Date(date);
    const today = new Date();
    return dueDate.getTime() < today.getTime();
  }

  private compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openDeleteDialog(bookId: string) {
    this.deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        bookId: bookId
      }
    });
    this.deleteDialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteBook(bookId);
      }
    });
  }

  deleteBook(bookId: string): void {
    const books = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedBooks = books.filter((book: Book) => book.id !== bookId);
    localStorage.setItem('favorites', JSON.stringify(updatedBooks));
    this.dataSource.data = updatedBooks;
  }


  displayedColumns: string[] = ['title', 'author', 'genre', 'year', 'added', 'checkOutCount', 'status', 'dueDate', 'comment','actions'];
}
