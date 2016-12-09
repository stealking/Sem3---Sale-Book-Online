import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Book} from '../../../classes/book'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  books: Book[];

  filteredBooks: any[];

  book: Book;
  constructor(public http: Http ) {}

  ngOnInit() {
    this.updateListBook();
  }
  filterBooks(event) {
    this.filteredBooks = [];
    for (let i = 0; i < this.books.length; i++) {
      let book = this.books[i];
      if (book.Name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredBooks.push(book);
      }
    }
  }

  handleDropdownClick() {
    this.filteredBooks = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredBooks = this.books;
    }, 100)
  }

    // render json result to books
  renderResults(res: any): void {
    this.books = null;
    if (res) {
      this.books = res;
    }
    console.log(JSON.stringify(this.books));
  }
  // update list book
  updateListBook(): void {
    this.http.get(
      'http://localhost:53106/book/getAll')
      .subscribe((res: any) => this.renderResults(res.json()));
  }
    addZero(num: number): string {
    var str: string = num + '';
    if (num < 100) str = 0 + str;
    if (num < 10) str = 0 + str;
    return str;
  }
}
