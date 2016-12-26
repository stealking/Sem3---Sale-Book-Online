import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderListFormComponent } from './order-list-form/order-list-form.component';
import {OrderDetailManagerComponentModule, routes as orderdetailManagerChildRoutes} from '../orderdetail-manager/orderdetail-manager.component';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DataTableModule,SharedModule,ButtonModule,DialogModule } from 'primeng/primeng';
import { ContextMenuModule , MenuItem, ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import { GrowlModule, MessagesModule, DropdownModule } from 'primeng/primeng';
@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css'],
  providers: [ConfirmationService]
})
export class OrderManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export const routes: Routes = [
  { path: 'new', component: OrderFormComponent },
  { path: 'edit/:id', component: OrderFormComponent, },
  { path: '', component: OrderListFormComponent },
  { path: 'check/:id', component: OrderFormComponent, children: orderdetailManagerChildRoutes }

]

@NgModule({
  declarations: [
    OrderFormComponent,
    OrderListFormComponent,
  ],
  exports: [
    OrderFormComponent,
    OrderListFormComponent,
    DropdownModule,
    PaginationModule,
    BrowserModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    DialogModule,
    ContextMenuModule,
    ConfirmDialogModule,
    GrowlModule,
    MessagesModule
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    HttpModule,
    DropdownModule,
    PaginationModule,
    BrowserModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    DialogModule,
    ContextMenuModule,
    ConfirmDialogModule,
    GrowlModule,
    MessagesModule,
    OrderDetailManagerComponentModule
  ]
})

export class OrderManagerComponentModule { }