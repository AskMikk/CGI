import { Component, OnInit } from '@angular/core';
import { CheckOutService } from '../../services/checkout.service';
import { CheckOut } from '../../models/checkout';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.scss']
})
export class CheckOutDetailComponent implements OnInit {
  checkout$!: Observable<CheckOut>;

  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckOutService,
  ) {
  }

  ngOnInit(): void {
    this.checkout$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.checkoutService.getCheckOut(id)))
  }
}
