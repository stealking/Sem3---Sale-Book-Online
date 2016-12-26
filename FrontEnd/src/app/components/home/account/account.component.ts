import { NgModule, Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { CurrentOrderComponent } from './current-order/current-order.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


import { DataScrollerModule } from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';



// service 
import { bookMultiqueryServiceInjectables } from '../book-search-list/book-search-list.component';
import { AuthenticationService } from '../../../services/AuthenticationService';
import { EqualValidator } from '../../../services/equal-validator.directive';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  
  
  constructor() {
    
  }

  ngOnInit() {
    
  }


}

export const routes: Routes = [
  { path: '', component: DetailFormComponent},
  { path: 'detail', component: DetailFormComponent},
  { path: 'history-order', component: OrderHistoryComponent},
  { path: 'current-order', component: CurrentOrderComponent},
  { path: 'forgotten-password', component: ForgottenPasswordComponent },
  { path: 'ResetPassword/:digest', component: ResetPasswordComponent },
]

@NgModule({
  declarations: [
    DetailFormComponent,
    OrderHistoryComponent,
    CurrentOrderComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent,
    
  ],
  exports: [
    DetailFormComponent,
    OrderHistoryComponent,
    CurrentOrderComponent,
    DataScrollerModule,
    DialogModule,
    ForgottenPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    DataScrollerModule,
    DialogModule,
    
  ],
  providers: [
    bookMultiqueryServiceInjectables,
    AuthenticationService,
    EqualValidator
  ]
})
export class AccountComponentModule {}