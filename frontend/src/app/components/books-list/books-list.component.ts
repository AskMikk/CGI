import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import {MatTableDataSource} from "@angular/material/table";

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

  ngOnInit(): void {
    this.bookService.getBooks({}).subscribe((books) => {
      this.dataSource.data = books.content;
    });
  }

  applyFilter() {
    this.dataSource.filter = this.selectedStatus;
  }
  displayedColumns: string[] = ['title', 'author', 'genre', 'year', 'added', 'checkOutCount', 'status', 'dueDate', 'comment'];
}
