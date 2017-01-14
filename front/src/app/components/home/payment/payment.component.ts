import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Observable } from 'rxjs/Observable';
import { Book } from '../../../classes/book';
import { OrderDetail } from '../../../classes/orderdetail';
import { Order } from '../../../classes/order';

import { BookService } from '../../../services/book.service';
import { SelectItem } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  sum: number = 0;
  orderDetailIDRemoved: number[] = [];
  order: Order = {};
  activeIndex: number = 2;
  private items: MenuItem[];
  cities: SelectItem[];
  constructor(public http: Http, private router: Router, private route: ActivatedRoute, public bookService: BookService) { }


  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem("order"));
    console.log(JSON.stringify(this.order));
    this.items = [
      { label: 'Đăng nhập' },
      { label: 'Địa chỉ' },
      { label: 'Thanh toán' }
    ];
    this.updatePriceSum();
  }
  updatePriceSum(): void {
    this.sum = 0;
    for (let orderDetail of this.order.OrderDetails) {
      this.sum += orderDetail.Number * orderDetail.Book.CPrice;
    }
  }
  checkout(): void {
    let addOrderDetail = this.addOrderDetail;
    let router = this.router;
    this.addOrder(function (http, order, orderID) {
      addOrderDetail(http, order, orderID, router)
    })
  }
  addOrder(callback) {
    this.order.Status = "new";
    let currentUser = JSON.parse(localStorage.getItem('user'));
    this.order.UserID = currentUser.UserID;
    let date = new Date(Date.now());
    this.order.Date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    console.log(this.order.Date);
    var tempOrder = {
      "Receiver": this.order.Receiver,
      "AddressType": this.order.AddressType,
      "City": this.order.City,
      "District": this.order.District,
      "Address": this.order.Address,
      "Status": this.order.Status,
      "UserID": this.order.UserID
    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(
      'http://localhost:53106/api/order/AddOrder',
      JSON.stringify(tempOrder), options)
      .subscribe((res: Response) => {
        // alert('Add Order Successed!');
        let orderID = JSON.parse(res["_body"]).OrderID;
        callback(this.http, this.order, orderID);
      })
  }
  addOrderDetail(http, order, orderID ,router) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var time = 0;
    var booksNum = order.OrderDetails.length;
    order.OrderDetails.forEach(function (book) {
      let tempBook = {
        OrderID: orderID,
        BookID: book.Book.BookID,
        Number: book.Number,
        Flag: book.Flag
      }
      time += 200;
      setTimeout(function () {
        console.log(JSON.stringify(tempBook));
        http.post(
          'http://localhost:53106/api/orderdetail/AddOrder',
          JSON.stringify(tempBook), options)
          .subscribe((res: Response) => {
            // alert('Create Orderdetail Successed!');
            booksNum--;
            if(booksNum==0){
              alert('Đơn hàng của bạn đã được ghi nhận!');
              localStorage.removeItem("order");
              router.navigate(['../']);
            }
          })
      }, time);

    });
  }
}
