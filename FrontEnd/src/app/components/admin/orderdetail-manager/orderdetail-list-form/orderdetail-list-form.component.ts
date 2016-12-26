import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetail } from '../../../../classes/orderdetail';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { ContextMenuModule, MenuItem } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { GrowlModule, MessagesModule } from 'primeng/primeng';

@Component({
  selector: 'app-orderdetail-list-form',
  templateUrl: './orderdetail-list-form.component.html',
  styleUrls: ['./orderdetail-list-form.component.css'],
  providers: [ConfirmationService]
})
export class OrderdetailListFormComponent implements OnInit {
  id: number;
  results: OrderDetail[];
  displayDialog: boolean;
  orderdetail: OrderDetail;
  selectedOrderDetail: OrderDetail;
  newOrderDetail: boolean;
  OrderDetails: OrderDetail[];
  items: MenuItem[];
  msgs: MessagesModule[] = []

  constructor(public http: Http, public route: ActivatedRoute, public router: Router, private confirmationService: ConfirmationService) {
    route.params.subscribe(params => {
      this.id = params['id'];
      (this.id);

    })
  }

  ngOnInit() {
    this.updateListOrderdt();
    this.items = [
      { label: 'View', icon: 'fa-search', command: (event) => this.editOrderdt(this.selectedOrderDetail.ID) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteOrderdt(this.selectedOrderDetail.ID) }
    ];
  }
  renderResults(res: any): void {
    this.results = null;
    if (res) {
      this.results = res;
    }
  }
  updateListOrderdt(): void {
    this.http.get('http://localhost:53106/api/orderdetail/GetAllOrdersdt/' + this.id).subscribe((res: any) => this.renderResults(res.json()));
  }
  //open edit order
  editOrderdt(id: number): void {
    this.router.navigate(['./editdt/' + id], { relativeTo: this.route });
  }


  //delete order
  deleteOrderdt(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Order?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.http.delete('http://localhost:53106/api/orderdetail/DeleteOrder/' + id).subscribe((res: any) => this.updateListOrderdt());
      }
    });
    
  }
  showDialogToAdd() {
    this.newOrderDetail = true;
    this.orderdetail = new OrderDetail(null,null,null,1,true);
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.newOrderDetail = false;
    this.orderdetail = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(c: OrderDetail): OrderDetail {
    let orderdetail = new OrderDetail(null,null,null,1,true);
    for (let prop in c) {
      orderdetail[prop] = c[prop];
    }
    return orderdetail;
  }
  findSelectedCarIndex(): number {
    return this.results.indexOf(this.selectedOrderDetail);
  }

}
