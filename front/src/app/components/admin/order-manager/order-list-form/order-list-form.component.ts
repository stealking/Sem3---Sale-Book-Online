import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute} from '@angular/router';
import { Order } from '../../../../classes/order';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { ContextMenuModule, MenuItem } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { GrowlModule, MessagesModule } from 'primeng/primeng';

@Component({
  selector: 'app-oder-list-form',
  templateUrl: './order-list-form.component.html',
  styleUrls: ['./order-list-form.component.css'],
  providers: [ConfirmationService]
})
export class OrderListFormComponent implements OnInit {

  results: Order[];
  displayDialog: boolean;
  order: Order;
  selectedOrder: Order;
  newOrder: boolean;
  Orders: Order[];
  items: MenuItem[];
  msgs: MessagesModule[] = []

  constructor(public http: Http, private router: Router, private route: ActivatedRoute,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.updateListOrder();
    this.items = [
      { label: 'View Oderdetail', icon: 'fa-search', command: (event) => this.checkOrder(this.selectedOrder.OrderID) },
      { label: 'View', icon: 'fa-search', command: (event) => this.editOrder(this.selectedOrder.OrderID) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteOrder(this.selectedOrder.OrderID) }
    ];
  }

  // render json result to dom
  renderResults(res: any): void{
    this.results = null;
    if(res){
      this.results = res;
    }
  }

  //update list order
  updateListOrder(): void{
    this.http.get('http://localhost:53106/api/order/getallorders').subscribe((res: any) => this.renderResults(res.json()));
  }
//open list of oder detail
 checkOrder(id: number): void{
   localStorage.setItem('ORID', JSON.stringify(id));
    this.router.navigate(['./check/'+ id], { relativeTo: this.route});
  }
  //open edit order
  editOrder(id: number): void{
    this.router.navigate(['./edit/' + id], { relativeTo: this.route});
  }
  

  //delete order
  deleteOrder(id: number): void{
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Order?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.http.delete('http://localhost:53106/api/order/deleteorder/' +id).subscribe((res: any) => this.updateListOrder());
      }
    });
  }
  showDialogToAdd() {
    this.newOrder = true;
    this.order = new Order();
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.newOrder = false;
    this.order = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(c: Order): Order {
    let order = new Order();
    for (let prop in c) {
      order[prop] = c[prop];
    }
    return order;
  }
  findSelectedCarIndex(): number {
    return this.results.indexOf(this.selectedOrder);
  }
}