import { NgModule, Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavComponent } from './nav/nav.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookSearchListComponent } from './book-search-list/book-search-list.component';
import {DataGridModule} from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
// import {InputTextModule} from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
// import {DropdownModule} from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import {ListboxModule} from 'primeng/primeng';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'books', component: BookSearchListComponent },
  { path: 'book/:id', component: BookDetailComponent },
]

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    MainPageComponent,
    BookDetailComponent,
    BookSearchListComponent
  ],
  exports: [
    NavComponent,
    HomeComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    RatingModule,
    ButtonModule,
    // DropdownModule
    SliderModule,
    DataGridModule,
    ListboxModule
  ]
})
export class HomeComponentModule { }