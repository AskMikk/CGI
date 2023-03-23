import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { MatTableDataSource } from "@angular/material/table";
import { Page, PageRequest } from '../../models/page';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  dataSource = new MatTableDataSource<Book>();
  deleteDialogRef!: MatDialogRef<DeleteDialogComponent>;

  constructor(
    private bookService: BookService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  selectedStatus: string = '';
  searchTerm: string = '';
  currentPage: Page<Book> = { content: [], totalElements: 0, number: 0, totalPages: 0 };

  ngOnInit(): void {
    this.loadPage({pageIndex: 0, pageSize: 100});
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

  loadPage(pageRequest: Partial<PageRequest>) {
    this.bookService.getBooks(pageRequest).subscribe((page) => {
      this.dataSource.data = page.content;
      this.currentPage = page;
    });
  }

  onLeftArrowClick() {
    if (this.currentPage && this.currentPage.number > 0) {
      const pageRequest: Partial<PageRequest> = {
        pageIndex: this.currentPage.number - 1,
        pageSize: 100
      };
      this.loadPage(pageRequest);
    }
  }

  onRightArrowClick() {
    if (this.currentPage && this.currentPage.number < this.currentPage.totalPages - 1) {
      const pageRequest: Partial<PageRequest> = {
        pageIndex: this.currentPage.number + 1,
        pageSize: 100
      };
      this.loadPage(pageRequest);
    }
  }

  displayedColumns: string[] = ['title', 'author', 'genre', 'year', 'added', 'checkOutCount', 'status', 'dueDate', 'comment', 'actions'];

  // https://www.htmlgoodies.com/javascript/custom-sort-javascript-tables/

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

  private compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  deleteBook(bookId: string) {
    this.bookService.deleteBook(bookId).subscribe(() => {
      const pageRequest: Partial<PageRequest> = {
        pageIndex: this.currentPage.number,
        pageSize: 100
      };
      this.loadPage(pageRequest);
    });
  }

  isOverdue(date: string): boolean {
    const dueDate = new Date(date);
    const today = new Date();
    return dueDate.getTime() < today.getTime();
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
}
