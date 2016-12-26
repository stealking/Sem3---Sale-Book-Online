import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../../../classes/book';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  id: number;
  book = new Book(this.id, '', '', 0);
  constructor(public http: Http, public route: ActivatedRoute, public location: Location, public router: Router) {
    route.params.subscribe(params => {
      this.id = params['id'];
    })
  }

  ngOnInit() {
    this.http.get(  
      'http://localhost:53106/api/book/getbookbyid/' + this.id)
      .subscribe((res: Response) => {
        this.book = res.json();
        this.book.CurrentPrice = (Math.floor(this.book.Price * (100 - this.book.SaleOff)) + "0 VND").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.book.PublishPrice = (this.book.Price * 100 + "0 VND").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.book.SavePrice = (Math.floor(this.book.Price * this.book.SaleOff) + "0 VND").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // this.book.PublishDateString = this.book.PublishDate.getDate() + '/' + (this.book.PublishDate.getMonth() + 1) + '/' + this.book.PublishDate.getFullYear();
        console.log(this.book);
      })
  }
  addZero(num: number): string {
    var str: string = num + '';
    if (num < 100) str = 0 + str;
    if (num < 10) str = 0 + str;
    return str;
  }
}
