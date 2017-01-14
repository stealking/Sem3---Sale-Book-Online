import { NgModule, Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';


import { NavComponent } from './nav/nav.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookSearchListComponent } from './book-search-list/book-search-list.component';
import { AccountComponent, AccountComponentModule, routes as accountChildRoutes } from './account/account.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { LoginComponent } from './login/login.component';
import { BasketComponent } from './basket/basket.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ContactComponent } from './contact/contact.component';
import { BookListTypeComponent } from './book-list-type/book-list-type.component';
import { FooterComponent } from './footer/footer.component';
import { PaymentComponent } from './payment/payment.component';


import { DataGridModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
// import {InputTextModule} from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { ListboxModule, GrowlModule, MessagesModule, InputTextareaModule } from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {GalleriaModule} from 'primeng/primeng';
import {StepsModule} from 'primeng/primeng';

// service 
import { bookMultiqueryServiceInjectables } from './book-search-list/book-search-list.component';
import { AuthGuard } from '../../services/auth.guard';
import { AuthenticationService } from '../../services/AuthenticationService';
import {BookService} from '../../services/book.service';
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
  // { path: 'account', component: AccountComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'forgotten-password', component: ForgottenPasswordComponent },
  { path: 'account', component: AccountComponent, children: accountChildRoutes },
  { path: 'contact', component: ContactComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'books/:status', component: BookListTypeComponent}
]

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    MainPageComponent,
    BookDetailComponent,
    BookSearchListComponent,
    LoginComponent,
    // AccountComponent,
    BasketComponent,
    DeliveryComponent,
    ForgottenPasswordComponent,
    EqualValidator,
    ContactComponent,
    BookListTypeComponent ,
    FooterComponent,
    PaymentComponent
  ],
  exports: [
    NavComponent,
    HomeComponent,
    LoginComponent,
    // AccountComponent,
    AccountComponentModule
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    // HttpModule,
    AutoCompleteModule,
    RatingModule,
    ButtonModule,
    DropdownModule,
    SliderModule,
    DataGridModule,
    ListboxModule,
    GrowlModule, MessagesModule, InputTextareaModule,
    RadioButtonModule,
    GalleriaModule,
    StepsModule
  ],
  providers: [
    bookMultiqueryServiceInjectables,
    AuthenticationService,
    BookService
  ]
})
export class HomeComponentModule { }