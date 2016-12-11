import { Component, OnInit } from '@angular/core';
import { order } from '../../../../classes/order';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// ??
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  ok: Object;
  homnay = new Date(Date.now());
  id: number;
  job: string;
    model = new order(  this.id,this.homnay.getFullYear()+'/'+this.homnay.getMonth()+'/'+this.homnay.getDate(), true);
  constructor(public http: Http, public route: ActivatedRoute, public location: Location, public router: Router) {
    route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) this.job = 'edit'; else this.job = 'new';
    })
  }


  ngOnInit(): void {
    // check if in edit page
    if (this.job === 'edit') {
      this.http.get(
        'http://localhost:53106/api/order/GetOrderById/' + this.id)
        .subscribe((res: Response) => {
          this.model = <order>res.json();
        })
    }
    this.updateListUser();
  }
  // submit form
  onSubmit() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    if (this.job == "new") {
      this.http.post(
        'http://localhost:53106/api/order/AddOrder',
        JSON.stringify(this.model), options)
        .subscribe((res: Response) => {
          alert(JSON.stringify(res.json()));
        })
    } else {
      this.http.put(
        'http://localhost:53106/api/order/UpdateOrder/' + this.id,
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
    this.model = new order( 1,this.homnay.getFullYear()+'/'+this.homnay.getMonth()+'/'+this.homnay.getDate(), true);
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
  updateListUser(): void{
    this.http.get('http://localhost:53106/api/user/getallusers').subscribe((res: any) => this.renderResults(res.json()));
  }
  

}