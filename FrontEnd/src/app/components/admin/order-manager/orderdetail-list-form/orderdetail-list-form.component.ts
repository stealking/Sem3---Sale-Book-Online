import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
// ??
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orderdetail-list-form',
  templateUrl: './orderdetail-list-form.component.html',
  styleUrls: ['./orderdetail-list-form.component.css']
})
export class OrderdetailListFormComponent implements OnInit {
  results: Object;
  id: number;
  
  constructor(public http: Http, public route: ActivatedRoute,public router: Router) {
    route.params.subscribe(params => {
      this.id = params['id'];
      (this.id);
      
    })
   }

  ngOnInit() {
    this.updateListOrderdt();
    console.log(this.id);
  }
   renderResults(res: any): void{
    this.results = null;
    if(res){
      this.results = res;
    }
  }
  updateListOrderdt(): void{
    this.http.get('http://localhost:53106/api/orderdetail/GetAllOrdersdt/' + this.id).subscribe((res: any) => this.renderResults(res.json()));
  }
  //open edit order
  editOrderdt(id: number): void{
    this.router.navigate(['./editdt/' + id], { relativeTo: this.route});
  }
  

  //delete order
  deleteOrderdt(id: number): void{
    this.http.delete('http://localhost:53106/api/orderdetail/DeleteOrder/' +id).subscribe((res: any) => this.updateListOrderdt());
  }

}
