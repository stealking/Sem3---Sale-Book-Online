import { Component, OnInit, NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListFormComponent } from './user-list-form/user-list-form.component';

import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DataTableModule,SharedModule,ButtonModule,DialogModule } from 'primeng/primeng';
import { ContextMenuModule , MenuItem, ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import { GrowlModule, MessagesModule, DropdownModule } from 'primeng/primeng';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css'],
  providers: [ConfirmationService]
})
export class UserManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export const routes: Routes = [
  { path: 'new', component: UserFormComponent },
  { path: 'edit/:id', component: UserFormComponent },
  { path: '', component: UserListFormComponent}
]

@NgModule({
  declarations: [
    UserFormComponent,
    UserListFormComponent,
   
  ],
  exports:[
    UserFormComponent,
    UserListFormComponent,
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
    
  ],
  imports:[
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
    
  ]
})

export class UserManagerComponentModule { }