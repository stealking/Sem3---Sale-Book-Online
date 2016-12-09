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
        })
  }
  addZero(num: number): string {
    var str: string = num + '';
    if (num < 100) str = 0 + str;
    if (num < 10) str = 0 + str;
    return str;
  }
}
