import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
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

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.bookService.getBooks({}).subscribe((books) => {
      this.dataSource.data = books.content;
    });
  }
  displayedColumns: string[] = ['title', 'author', 'genre', 'year', 'added', 'checkOutCount', 'status', 'dueDate', 'comment'];
}
