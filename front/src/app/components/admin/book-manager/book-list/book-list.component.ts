import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Book } from '../../../../classes/book';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { ContextMenuModule, MenuItem } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { GrowlModule, MessagesModule } from 'primeng/primeng';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [ConfirmationService],
})
export class BookListComponent implements OnInit {

  results: Book[];
  displayDialog: boolean;
  book: Book;
  selectedBook: Book;
  newBook: boolean;
  Books: Book[];
  items: MenuItem[];
  msgs: MessagesModule[] = [];

  constructor(public http: Http, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService) { }


  ngOnInit() {
    this.updateListBook();
    this.items = [
      { label: 'View', icon: 'fa-search', command: (event) => this.editBook(this.selectedBook.BookID) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteBook(this.selectedBook.BookID) }
    ];
  }

  // render json result to dom
  renderResults(res: any): void {
    this.results = null;
    if (res) {
      this.results = res;
    }
  }
  // update list book
  updateListBook(): void {
    
    this.http.get('http://localhost:53106/book/getAll').subscribe((res: any) => this.renderResults(res.json()));
  }
  // open edit book
  editBook(id: number): void {
    this.router.navigate(['./edit/', id], { relativeTo: this.route });
  }

  addBook(): void{
    this.router.navigate(['./new']), { relativeTo: this.route};
  }
  //
  deleteBook(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this book?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.http.delete('http://localhost:53106/api/book/DeleteBook/' + id).subscribe((res: any) => this.updateListBook());
      }
    });
    
  }

  showDialogToAdd() {
    this.newBook = true;
    this.book = new Book();
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.newBook = false;
    this.book = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(c: Book): Book {
    let book = new Book();
    for (let prop in c) {
      book[prop] = c[prop];
    }
    return book;
  }

  findSelectedCarIndex(): number {
    return this.results.indexOf(this.selectedBook);
  }
}