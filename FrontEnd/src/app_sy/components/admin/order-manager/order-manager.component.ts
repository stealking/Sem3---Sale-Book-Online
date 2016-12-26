import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderListFormComponent } from './order-list-form/order-list-form.component';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export const routes: Routes = [
  { path: 'new', component: OrderFormComponent },
  { path: 'edit/:id', component: OrderFormComponent },
  { path: '', component: OrderListFormComponent}
]

@NgModule({
  declarations: [
    OrderFormComponent,
    OrderListFormComponent
  ],
  exports:[
    OrderFormComponent,
    OrderListFormComponent
  ],
  imports:[
    RouterModule,
    CommonModule,
    FormsModule,
    HttpModule
  ]
})

export class OrderManagerComponentModule { }