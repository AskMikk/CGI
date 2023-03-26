import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {CheckoutListComponent} from "./components/checkout-list/checkout-list.component";
import {CheckOutDetailComponent} from "./components/checkout-detail/checkout-detail.component";
import { ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from "@angular/material/sort";
import {DeleteDialogComponent} from "./components/delete-dialog/delete-dialog.component";
import {ReturnDialogComponent} from "./components/return-dialog/return-dialog.component";
import {CheckoutAddComponent} from "./components/checkout-add/checkout-add.component";
import {FavoritesComponent} from "./components/favorites/favorites.component";

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailComponent,
    CheckoutListComponent,
    CheckOutDetailComponent,
    DeleteDialogComponent,
    ReturnDialogComponent,
    CheckoutAddComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
