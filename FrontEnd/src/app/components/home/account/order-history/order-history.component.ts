import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {DataScrollerModule} from 'primeng/primeng';
import { Order } from '../../../../classes/order';
import { OrderDetail } from '../../../../classes/orderdetail';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  userID = JSON.parse(localStorage.getItem('user')).UserID;
  results: Order[];
  orderdetail: Object;
  selectedOrder: Order;
  displayDialog: boolean;
  selectedOrderDetail: OrderDetail[];
  constructor(public http: Http) { }

  ngOnInit() {
    this.updateListOrder();
  }

  renderResults(res: any): void {
    this.results = null;
    if (res) {
      this.results = res;
    }
  }

  renderDetail(res: any): void {
    this.orderdetail = null;
    if (res) {
      this.orderdetail = res;
    }
  }

  //update list user
  updateListOrder(): void {
    this.http.get('http://localhost:53106/api/order/GetAllOrderHistory/' + this.userID).subscribe((res: any) => this.renderResults(res.json()));
  }

  updateListOrderDetail(orderId): void {
    this.http.get('http://localhost:53106/api/OrderDetail/GetAllOrdersdtistory/' + orderId).subscribe((res: any) => this.renderDetail(res.json()));
  }

  selectCar(order: Order) {
        this.selectedOrder = order;
        this.updateListOrderDetail(this.selectedOrder.OrderID);
        console.log(this.orderdetail);
        this.displayDialog = true;
    }

    onDialogHide() {
        this.selectedOrder = null;
    }

}
