import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../classes/order';
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
  date = new Date(Date.now());
  id: number;
  job: string;
  d: string[];
    model = new Order();
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
          this.model = <Order>res.json();
          this.d = this.model.Date.split("T");
          this.model.Date = this.d[0];
          console.log(this.model.Date);
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
          alert('Add Order Successed!');
        })
    } else {
      this.http.put(
        'http://localhost:53106/api/order/UpdateOrder/' + this.id,
        JSON.stringify(this.model), options)
        .subscribe((res: Response) => {
          alert('update Order Successed!');
        })
    }
  }

  get diagnostic() {
    return JSON.stringify(this.model)
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