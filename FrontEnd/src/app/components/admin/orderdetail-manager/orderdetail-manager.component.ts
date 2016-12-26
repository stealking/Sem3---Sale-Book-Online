import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { OrderdetailFormComponent } from './orderdetail-form/orderdetail-form.component';
import { OrderdetailListFormComponent } from './orderdetail-list-form/orderdetail-list-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DataTableModule,SharedModule,ButtonModule,DialogModule } from 'primeng/primeng';
import { ContextMenuModule , MenuItem, ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import { GrowlModule, MessagesModule, DropdownModule } from 'primeng/primeng';
@Component({
  selector: 'app-orderdetail-manager',
  templateUrl: './orderdetail-manager.component.html',
  styleUrls: ['./orderdetail-manager.component.css'],
  providers: [ConfirmationService]
})
export class OrderdetailManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export const routes: Routes = [
  { path: '', component: OrderdetailListFormComponent },
  { path: 'newdt', component: OrderdetailFormComponent },
  { path: 'editdt/:id', component: OrderdetailFormComponent },
]

@NgModule({
  declarations: [
    OrderdetailFormComponent,
    OrderdetailListFormComponent,
    
  ],
  exports: [
    OrderdetailFormComponent,
    OrderdetailListFormComponent,
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
    MessagesModule
  ]
})

export class OrderDetailManagerComponentModule { }
