import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Observable } from 'rxjs/Observable';
import { Book } from '../../../classes/book';
import { OrderDetail } from '../../../classes/orderdetail';
import { Order } from '../../../classes/order';

import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  // books: Book[];
  // orderDetails: OrderDetail[];
  sum: number = 0;
  orderDetailIDRemoved: number[] = [];
  order: Order = {};

  constructor(public http: Http, private router: Router, private route: ActivatedRoute, public bookService: BookService) { }


  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem("order"));
    console.log("order: " + localStorage.getItem("order"));

    let bookService = this.bookService;
    this.order.OrderDetails.forEach(function (orderDetail) {
      let book = orderDetail.Book;
      book.CurrentPrice = bookService.formatPrice(book.Price * (100 - book.SaleOff));
      book.CPrice = Math.floor(book.Price * (100 - book.SaleOff));
      book.PublishPrice = bookService.formatPrice(book.Price * 100);
      book.SavePrice = bookService.formatPrice(book.Price * book.SaleOff);
      orderDetail.Book = book;
    });

    this.updatePriceSum();
    // this.updateListBook();
  }
  updateListBook(): void {
    // this.http.get(
    // 'http://localhost:53106/book/getAll')
    // .subscribe((res: any) => this.renderResults(res.json()));

    // this.http.get(
    //   'http://localhost:53106/api/order/SearchByUserID/1')
    //   .subscribe((res: any) => {
    //     this.renderResults(JSON.parse(res.json()));
    //   });
  }

  // render json result to dom
  renderResults(res: any): void {
    // this.order = null;
    // if (res) {
    //   this.order = res[0];
    //   var bookService = this.bookService;

    //   console.log(this.order.OrderDetails)
    //   // this.books =  this.order.OrderDetails.map((orderDetail)=> orderDetail.Book);
    //   // console.log(this.books);
    //   this.updatePriceSum();
    // }
    // console.log(JSON.stringify(this.order));
    // console.log(JSON.stringify(this.books[0]));
  }
  updatePriceSum(): void {
    this.sum = 0;
    for (let orderDetail of this.order.OrderDetails) {
      this.sum += orderDetail.Number * orderDetail.Book.CPrice;
    }

  }
  removeFromOrder(orderDetailID): void {
    for (let i = 0; i < this.order.OrderDetails.length; i++) {
      if (this.order.OrderDetails[i].ID == orderDetailID) {
        this.order.OrderDetails.splice(i, 1);
        break;
      }
    }
    this.updatePriceSum();
    // add ids of removed orderDetails
    this.orderDetailIDRemoved.push(orderDetailID);
    localStorage.setItem("order", JSON.stringify(this.order));
  }
  saveMyChoice(): void {
    localStorage.setItem("order", JSON.stringify(this.order));

    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    // let tempOrder: Order = this.order;
    // delete tempOrder.OrderDetails;
    //  this.http.put(
    //   'http://localhost:53106/api/order/UpdateOrder',
    //   JSON.stringify(tempOrder), options)
    //   .subscribe((res: Response) => {
    //     alert(JSON.stringify(res.json()));
    //   });
    // let http = this.http;
    // let time = 0;
    // update
    // for (let orderDetail of this.order.OrderDetails) {
    //   let tempOrderDetail = JSON.parse(JSON.stringify(orderDetail));
    //   delete tempOrderDetail.Book;
    //   console.log(JSON.stringify(tempOrderDetail));

    //   let updateOrderDetail = function () {
    //     http.put(
    //       'http://localhost:53106/api/orderdetail/UpdateOrder',
    //       JSON.stringify(tempOrderDetail), options)
    //       .subscribe((res: Response) => {
    //         // alert(JSON.stringify(res.json()));
    //       });
    //   }
    //   time += 300;
    //   setTimeout(function () {
    //     updateOrderDetail();
    //   }, time);

    // }

    // delete
    // for (let orderDetailID of this.orderDetailIDRemoved) {
    //   let deleteOrderDetail = function () {
    //     http.delete('http://localhost:53106/api/orderdetail/DeleteOrder/' + orderDetailID).subscribe((res: any) => { });
    //   }
    //   time += 100;
    //   setTimeout(function () {
    //     deleteOrderDetail();
    //   }, time);

    // }

  }
  continueShopping() {
    this.saveMyChoice();
    this.router.navigate(['./books']);
  }
  goDelivery() {
    if(localStorage.getItem('user')){
    this.saveMyChoice();
    this.router.navigate(['./delivery']);
    } else {
      alert("Bạn phải đăng nhập để đặt hàng");
      this.router.navigate(['/login']);
    }
  }
}