import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {DataScrollerModule} from 'primeng/primeng';
import { order } from '../../../../classes/order';
import { OrderDetail } from '../../../../classes/orderdetail';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {

  userID = JSON.parse(localStorage.getItem('user')).UserID;
  results: order[];
  orderdetail: Object;
  selectedOrder: order;
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
    this.http.get('http://localhost:53106/api/order/SearchByUserID/' + this.userID).subscribe((res: any) => this.renderResults(res.json()));
  }

  updateListOrderDetail(orderId): void {
    this.http.get('http://localhost:53106/api/OrderDetail/GetAllOrdersdt/' + orderId).subscribe((res: any) => this.renderDetail(res.json()));
  }

  selectCar(order: order) {
        this.selectedOrder = order;
        this.updateListOrderDetail(this.selectedOrder.OrderID);
        console.log(this.orderdetail);
        this.displayDialog = true;
    }

    onDialogHide() {
        this.selectedOrder = null;
    }


}
