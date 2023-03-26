import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CheckOut } from '../../models/checkout';
import { CheckOutService } from '../../services/checkout.service';
import { v4 } from 'uuid';


@Component({
  selector: 'app-checkout-add',
  templateUrl: './checkout-add.component.html',
  styleUrls: ['./checkout-add.component.scss']
})
export class CheckoutAddComponent implements OnInit {
  book$!: Observable<Book>;
  userForm!: FormGroup;
  minDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private checkOutService: CheckOutService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.getBook(id)));
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    return date >= this.minDate;
  };

  onSubmit() {
    if (this.userForm.valid) {
      const checkOutData = this.userForm.value;
      this.book$.subscribe(book => {
        const checkOut: CheckOut = {
          id: v4(),
          borrowerFirstName: checkOutData.firstName,
          borrowerLastName: checkOutData.lastName,
          borrowedBook: book,
          checkedOutDate: new Date().toISOString(),
          dueDate: checkOutData.date.toISOString(),
          returnedDate: null,
        };
        this.checkOutService.saveCheckOut(checkOut).subscribe(response => {
          console.log('CheckOut saved successfully', response);
        }, error => {
          console.error('Error saving checkOut', error);
        });
        this.bookService.checkoutBook(book.id, checkOut.dueDate).subscribe(response => {
          console.log('Book borrowed successfully', response);
          this.router.navigate(['/books']);
        }, error => {
          console.error('Error saving book', error);
        });
      });
    }
  }
}
