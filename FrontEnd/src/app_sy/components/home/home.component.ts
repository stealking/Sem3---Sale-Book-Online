import { NgModule, Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookSearchListComponent } from './book-search-list/book-search-list.component';
import { LoginComponent } from './login/login.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { DataGridModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { ListboxModule, GrowlModule, MessagesModule, InputTextareaModule } from 'primeng/primeng';
import { AccountComponent, AccountComponentModule, routes as accountChildRoutes } from './account/account.component';


// service 
import { bookMultiqueryServiceInjectables } from './book-search-list/book-search-list.component';
import { AuthGuard } from '../../services/auth.guard';
import { AuthenticationService } from '../../services/AuthenticationService';
import { EqualValidator } from '../../services/equal-validator.directive';
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
  { path: 'home', component: MainPageComponent },
  { path: 'books', component: BookSearchListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotten-password', component: ForgottenPasswordComponent },
  { path: 'account', component: AccountComponent, children: accountChildRoutes }
]

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    MainPageComponent,
    BookDetailComponent,
    BookSearchListComponent,
    LoginComponent,
    AccountComponent,
    ForgottenPasswordComponent,
    EqualValidator
  ],
  exports: [
    NavComponent,
    HomeComponent,
    LoginComponent,
    AccountComponent,
    AccountComponentModule,
    ForgottenPasswordComponent,

  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    AutoCompleteModule,
    RatingModule,
    ButtonModule,
    // DropdownModule
    SliderModule,
    DataGridModule,
    ListboxModule,
    GrowlModule,
    MessagesModule,
    InputTextareaModule,
    AccountComponentModule

  ],
  providers: [
    bookMultiqueryServiceInjectables,
    AuthenticationService,
    EqualValidator
  ]
})
export class HomeComponentModule { }