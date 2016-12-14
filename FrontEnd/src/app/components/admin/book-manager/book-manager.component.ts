import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { FileUploadModule } from 'ng2-file-upload';
@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css']
})
export class BookManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export const routes: Routes = [
  { path: 'new', component: BookFormComponent },
  { path: 'edit/:id', component: BookFormComponent },
  { path: '', component: BookListComponent}
]

@NgModule({
  declarations: [
    BookFormComponent,
    BookListComponent
  ],
  exports: [
    BookFormComponent,
    BookListComponent,
    
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    FileUploadModule
  ]
})
export class BookManagerComponentModule { }
