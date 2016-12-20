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
  homnay = new Date(Date.now());
  id: number;
  job: string;
<<<<<<< HEAD
    model = new order(this.id,null,this.homnay.getFullYear()+'/'+this.homnay.getMonth()+'/'+this.homnay.getDate(), true);
=======
    model = new Order(  this.id,this.homnay.getFullYear()+'/'+this.homnay.getMonth()+'/'+this.homnay.getDate(), true);
>>>>>>> 634c2086ad4fd5e3d87f22ce2dab27c02991b441
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
<<<<<<< HEAD
    this.model = new order(this.id, null, this.homnay.getFullYear()+'/'+this.homnay.getMonth()+'/'+this.homnay.getDate(), true);
=======
    this.model = new Order( 1,this.homnay.getFullYear()+'/'+this.homnay.getMonth()+'/'+this.homnay.getDate(), true);
>>>>>>> 634c2086ad4fd5e3d87f22ce2dab27c02991b441
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