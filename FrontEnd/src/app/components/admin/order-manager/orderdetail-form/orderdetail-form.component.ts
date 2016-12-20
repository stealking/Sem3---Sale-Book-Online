import { Component, OnInit } from '@angular/core';
import { OrderDetail } from '../../../../classes/orderdetail';
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
  model = new OrderDetail(this.id,3,1,1,true);
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
          alert(JSON.stringify(res.json()));
        })
    } else {
      this.http.put(
        'http://localhost:53106/api/orderdetail/UpdateOrder/' + this.id,
        JSON.stringify(this.model), options)
        .subscribe((res: Response) => {
          alert(JSON.stringify(res.json()));
        })
    }
  }

  get diagnostic() {
    return JSON.stringify(this.model)
  }

  newOrder() {
    this.model = new OrderDetail(this.id,3,1,1,true);
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
    this.http.get('http://localhost:53106/api/orderdetail/GetAllOrders').subscribe((res: any) => this.renderResults(res.json()));
  }
  updateListBook(): void{
    this.http.get('http://localhost:53106/Book/Getall').subscribe((res: any) => this.renderResults1(res.json()));
  }

}
