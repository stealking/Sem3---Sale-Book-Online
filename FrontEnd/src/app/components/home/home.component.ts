import { NgModule, Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';

import { NavComponent } from './nav/nav.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookSearchListComponent } from './book-search-list/book-search-list.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { DataGridModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
// import {InputTextModule} from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
// import {DropdownModule} from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import {ListboxModule, GrowlModule,MessagesModule,InputTextareaModule} from 'primeng/primeng';


// service 
import { bookMultiqueryServiceInjectables } from './book-search-list/book-search-list.component';
import { AuthGuard } from '../../services/auth.guard';
import { AuthenticationService } from '../../services/AuthenticationService';
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
  { path: '', component: MainPageComponent},
  { path: 'home', component: MainPageComponent},
  { path: 'books', component: BookSearchListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent }
]

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    MainPageComponent,
    BookDetailComponent,
    BookSearchListComponent,
    LoginComponent,
    AccountComponent
  ],
  exports: [
    NavComponent,
    HomeComponent,
    LoginComponent,
    AccountComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    // HttpModule,
    AutoCompleteModule,
    RatingModule,
    ButtonModule,
    // DropdownModule
    SliderModule,
    DataGridModule,
    ListboxModule,
     GrowlModule,MessagesModule,InputTextareaModule
    
  ],
  providers: [
    bookMultiqueryServiceInjectables,
    AuthenticationService
  ]
})
export class HomeComponentModule { }