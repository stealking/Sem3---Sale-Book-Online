import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../../classes/book'
import {Location} from '@angular/common';
import { AuthenticationService } from '../../../services/AuthenticationService';
import { User } from '../../../classes/user'; 
import { Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  books: Book[];
  currentUser: User;
  query = {
    rate: '',
    typeId: [],
    name: '',
    minPrice: '',
    maxPrice: '',
    status: ''
  };
  filteredBooks: any[];
  subscription: Subscription;
  book: string;
  constructor(public http: Http, private router: Router, private route: ActivatedRoute, private _service: AuthenticationService) {
    this.subscription = _service.loggedUser$.subscribe(
      currentUser => {
        this.currentUser = currentUser;
      }
    )
  }

  ngOnInit() {
    this.updateListBook();
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log("Curen user"  + JSON.stringify(this.currentUser));
  }
  filterBooks(event) {
    this.filteredBooks = [];
    console.log(1234);
    for (let i = 0; i < this.books.length; i++) {
      let book = this.books[i];
      if (book.Name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredBooks.push(book.Name);
      }
    }
  }
getBookViaName(name: string):Book{
  var temp: Book;
  this.books.forEach(function(book){
    if(book.Name === name){
      temp = book;
    }
  });
  return temp;
}
searchBookByKeyWord(){
  this.router.navigate(['books'],{queryParams: {keyWord: this.book}} );
}
  handleDropdownClick() {
    this.filteredBooks = [];
    var bookNames = [];
    this.books.forEach(function(book){
      bookNames.push(book.Name);
    });
    //mimic remote call
    setTimeout(() => {
      this.filteredBooks = this.books;
    }, 100)
  }
  goBook(id:number):void{
    this.router.navigate(['/book/', id]);
  }
  goHome():boolean{
    this.router.navigate(['']);
    return false;
  }
  goBooks():void{
    // this.router.navigate(['books']);
    this.router.navigate(['books'],{queryParams: {keyWord:''}} );
  }
    // render json result to books
  renderResults(res: any): void {
    this.books = null;
    if (res) {
      this.books = res;
    }
    // console.log(JSON.stringify(this.books));
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

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['./home']);
  }
}
