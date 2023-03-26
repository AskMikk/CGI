import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import {CheckoutListComponent} from "./components/checkout-list/checkout-list.component";
import {CheckOutDetailComponent} from "./components/checkout-detail/checkout-detail.component";
import {CheckoutAddComponent} from "./components/checkout-add/checkout-add.component";
import {FavoritesComponent} from "./components/favorites/favorites.component";

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BooksListComponent},
  {path: 'books/:id', component: BookDetailComponent},
  {path: 'checkout', component: CheckoutListComponent},
  {path: 'checkout/:id', component: CheckOutDetailComponent},
  {path: 'checkout/add/:id', component: CheckoutAddComponent},
  {path: 'favorite', component: FavoritesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
