import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import {MatTableDataSource} from "@angular/material/table";
import {Page, PageRequest} from "../../models/page";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  dataSource = new MatTableDataSource<Book>();

  constructor(
    private bookService: BookService,
  ) {
  }

  selectedStatus: string = '';

  currentPage: Page<Book> = { content: [], totalElements: 0, number: 0, totalPages: 0 };

  ngOnInit(): void {
    this.loadPage({pageIndex: 0, pageSize: 100});
  }

  applyFilter() {
    this.dataSource.filter = this.selectedStatus;
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

  displayedColumns: string[] = ['title', 'author', 'genre', 'year', 'added', 'checkOutCount', 'status', 'dueDate', 'comment'];
}
