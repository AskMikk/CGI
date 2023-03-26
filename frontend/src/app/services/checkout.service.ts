import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PageRequest } from '../models/page';
import { CheckOut } from '../models/checkout';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestUtil } from './rest-util';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  private readonly baseUrl = environment.backendUrl + '/api/checkout';

  constructor(
    private http: HttpClient,
  ) {
  }

  getCheckOuts(filter: Partial<PageRequest>): Observable<Page<CheckOut>> {
    const url = this.baseUrl + '/getCheckouts';
    const params = RestUtil.buildParamsFromPageRequest(filter);
    return this.http.get<Page<CheckOut>>(url, {params});
  }

  getCheckOut(checkOutId: string): Observable<CheckOut> {
    const url = this.baseUrl + '/getCheckout';
    const params = new HttpParams().set('checkOutId', checkOutId);
    return this.http.get<CheckOut>(url, {params});
  }

  saveCheckOut(checkOut: CheckOut): Observable<void> {
    const url = this.baseUrl + '/saveCheckout';
    return this.http.post<void>(url, checkOut);
  }

  deleteCheckOut(checkOutId: string): Observable<void> {
    const url = this.baseUrl + '/checkout';
    const params = new HttpParams().set('checkOutId', checkOutId);
    return this.http.delete<void>(url, {params});
  }

  returnBook(checkOutId: string): Observable<void> {
    const url = this.baseUrl + '/returnBook';
    const params = new HttpParams().set('checkOutId', checkOutId);
    return this.http.put<void>(url, {}, {params});
  }

}
