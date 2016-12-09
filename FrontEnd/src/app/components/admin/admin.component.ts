import { NgModule, Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagerComponent, UserManagerComponentModule, routes as userManagerChildRoutes } from './user-manager/user-manager.component';
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
  { path: 'book', component: BookManagerComponent, children: bookManagerChildRoutes },
  { path: 'user', component: UserManagerComponent, children: userManagerChildRoutes}
]

@NgModule({
  declarations: [
    UserManagerComponent,
    BookManagerComponent,
    AdminComponent
  ],
  exports: [
    UserManagerComponent,
    BookManagerComponent,
    AdminComponent
  ],
  imports: [
    RouterModule,
    BookManagerComponentModule,
    UserManagerComponentModule,
    CommonModule
  ]
})
export class AdminComponentModule { }