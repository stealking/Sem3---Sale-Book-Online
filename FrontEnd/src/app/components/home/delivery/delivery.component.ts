import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Observable } from 'rxjs/Observable';
import { Book } from '../../../classes/book';
import { OrderDetail } from '../../../classes/orderdetail';
import { Order } from '../../../classes/order';

import { BookService } from '../../../services/book.service';
import {SelectItem} from 'primeng/primeng';
@Component({
  selector: 'app-basket',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  // books: Book[];
  // orderDetails: OrderDetail[];
  sum: number = 0;
  orderDetailIDRemoved: number[] = [];
  order: Order = {};

   cities: SelectItem[];
  constructor(public http: Http, private router: Router, private route: ActivatedRoute, public bookService: BookService) { }


  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem("order"));
      this.cities = [];
        this.cities.push({label:'Chọn Tỉnh / Thành phố', value:null});
        this.cities.push({label:'Hà Nội', value:'Hà Nội'});
        this.cities.push({label:'Đà Nẵng', value:'Đà Nẵng'});
        this.cities.push({label:'Hồ Chí Minh', value:'Hồ Chí Minh'});
  }
  next(){
    console.log(this.order);
  }
}