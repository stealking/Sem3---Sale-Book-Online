import { NgModule, Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookManagerComponent, BookManagerComponentModule, routes as bookManagerChildRoutes } from './book-manager/book-manager.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  goUser(){
    alert('chua viet');
  }
  goBook(){
    
  }
  goOrder(){
    alert('chua viet');
  }
}

export const routes: Routes = [
  { path: 'book', component: BookManagerComponent, children: bookManagerChildRoutes }
]

@NgModule({
  declarations: [
    BookManagerComponent,
    AdminComponent
  ],
  exports: [
    BookManagerComponent,
    AdminComponent
  ],
  imports: [
    RouterModule,
    BookManagerComponentModule,
    CommonModule
  ]
})
export class AdminComponentModule { }