import { Component, OnInit } from '@angular/core';
import { OrderDetail } from '../../../../classes/orderdetail';
import { Order} from '../../../../classes/order';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// ??
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orderdetail-form',
  templateUrl: './orderdetail-form.component.html',
  styleUrls: ['./orderdetail-form.component.css']
})
export class OrderdetailFormComponent implements OnInit {
  id: number;
  job: string;
  ok: Object;
  ok1: Object;
  orid: number;
  model = new OrderDetail(null,null,null,null,true);
  constructor(public http: Http, public route: ActivatedRoute, public location: Location, public router: Router) {
    route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) this.job = 'editdt'; else this.job = 'newdt';
    })
   }

  ngOnInit() {
    
    if (this.job === 'editdt') {
      this.http.get(
        'http://localhost:53106/api/orderdetail/GetOrderById/' + this.id)
        .subscribe((res: Response) => {
          this.model = <OrderDetail>res.json();
        })
    }
  var retrievedObject = localStorage.getItem('ORID');
    this.orid = JSON.parse(retrievedObject);
    console.log(this.orid)
    this.model = new OrderDetail(null,this.orid,null,null,true);
    this.updateListOrder();
    this.updateListBook();
  }
  // submit form
  onSubmit() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    if (this.job == "newdt") {
      this.http.post(
        'http://localhost:53106/api/orderdetail/AddOrder',
        JSON.stringify(this.model), options)
        .subscribe((res: Response) => {
          alert('Create Orderdetail Successed!');
        })
    } else {
      this.http.put(
        'http://localhost:53106/api/orderdetail/UpdateOrder/' + this.id,
        JSON.stringify(this.model), options)
        .subscribe((res: Response) => {
          alert('update OrderDetail Successed!');
        })
    }
  }

  get diagnostic() {
    return JSON.stringify(this.model)
  }

  newOrder() {
    this.model = new OrderDetail(null,this.orid,null,null,true);
  }

  back(): void {
    this.router.navigate(['./'], { relativeTo: this.route });
  }
  renderResults(res: any): void{
    this.ok = null;
    if(res){
      this.ok = res;
    }
  }
  renderResults1(res: any): void{
    this.ok1 = null;
    if(res){
      this.ok1 = res;
    }
  }
  updateListOrder(): void{
    this.http.get('http://localhost:53106/api/order/GetAllOrders').subscribe((res: any) => this.renderResults(res.json()));
  }
  updateListBook(): void{
    this.http.get('http://localhost:53106/Book/Getall').subscribe((res: any) => this.renderResults1(res.json()));
  }

}
