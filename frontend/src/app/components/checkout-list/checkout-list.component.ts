import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { Page, PageRequest } from "../../models/page";
import { CheckOut } from "../../models/checkout";
import { CheckOutService } from "../../services/checkout.service";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ReturnDialogComponent } from "../return-dialog/return-dialog.component";

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.scss']
})
export class CheckoutListComponent implements OnInit {

  dataSource = new MatTableDataSource<CheckOut>();
  deleteDialogRef!: MatDialogRef<DeleteDialogComponent>;
  returnDialogRef!: MatDialogRef<ReturnDialogComponent>;

  constructor(
    private checkoutService: CheckOutService,
    public dialog: MatDialog
  ) {}

  searchTerm: string = '';
  currentPage: Page<CheckOut> = { content: [], totalElements: 0, number: 0, totalPages: 0 };


  ngOnInit(): void {
    this.loadPage({pageIndex: 0, pageSize: 100});
  }


  applySearch() {
    this.dataSource.filterPredicate = (data: CheckOut, filter: string) => {
      return data.borrowerFirstName.toLowerCase().includes(filter) ||
        data.borrowerLastName.toLowerCase().includes(filter) ||
        data.borrowedBook.title.toLowerCase().includes(filter) ||
        data.borrowedBook.author.toLowerCase().includes(filter)
    };
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  loadPage(pageRequest: Partial<PageRequest>) {
    this.checkoutService.getCheckOuts(pageRequest).subscribe((page) => {
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

  displayedColumns: string[] = ['borrowerBookTitle', 'borrowerFirstName', 'borrowerLastName', 'checkedOutDate', 'dueDate', 'returnedDate', 'actions'];



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
        case 'borrowerBookTitle': return this.compare(a.borrowedBook.title, b.borrowedBook.title, isAsc);
        case 'borrowerFirstName': return this.compare(a.borrowerFirstName, b.borrowerFirstName, isAsc);
        case 'borrowerLastName': return this.compare(a.borrowerLastName, b.borrowerLastName, isAsc);
        case 'checkedOutDate': return this.compare(a.checkedOutDate, b.checkedOutDate, isAsc);
        case 'dueDate': return this.compare(a.dueDate, b.dueDate, isAsc);
        default: return 0;
      }
    });
  }
  private compare(a: string | number, b: string |number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  returnBook(checkOutId: string) {
    this.checkoutService.returnBook(checkOutId).subscribe(() => {
      const pageRequest: Partial<PageRequest> = {
        pageIndex: this.currentPage.number,
        pageSize: 100
      };
      this.loadPage(pageRequest);
    });
  }


  deleteCheckout(checkOutId: string) {
      this.checkoutService.deleteCheckOut(checkOutId).subscribe(() => {
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


  openDeleteDialog(checkoutID: string) {
    this.deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        checkoutID: checkoutID
      }
    });
    this.deleteDialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCheckout(checkoutID);
      }
    });
  }

  openReturnDialog(checkoutID: string) {
    this.returnDialogRef = this.dialog.open(ReturnDialogComponent, {
      data: {
        checkoutID: checkoutID
      }
    });
    this.returnDialogRef.afterClosed().subscribe(result => {
      if (result === 'return') {
        this.returnBook(checkoutID);
      }
    });
  }
}


