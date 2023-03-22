import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {Page, PageRequest} from "../../models/page";
import {CheckOut} from "../../models/checkout";
import {CheckOutService} from "../../services/checkout.service";

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.scss']
})
export class CheckoutListComponent implements OnInit {

  dataSource = new MatTableDataSource<CheckOut>();

  constructor(
    private checkoutService: CheckOutService,
  ) {}

  selectedStatus: string = '';
  searchTerm: string = '';
  currentPage: Page<CheckOut> = { content: [], totalElements: 0, number: 0, totalPages: 0 };


  ngOnInit(): void {
    this.loadPage({pageIndex: 0, pageSize: 100});
  }

  applyFilter() {
    this.dataSource.filter = this.selectedStatus;
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

  displayedColumns: string[] = ['borrowerBookTitle','borrowerFirstName', 'borrowerLastName', 'checkedOutDate', 'dueDate', 'returnedDate'];

}
