import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListFormComponent } from './user-list-form/user-list-form.component';
import {DropdownModule} from 'primeng/primeng';
// import { CustomFormsModule } from 'ng2-validation';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
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
    
  ],
  imports:[
    RouterModule,
    CommonModule,
    FormsModule,
    HttpModule,
    DropdownModule,
    
  ]
})

export class UserManagerComponentModule { }