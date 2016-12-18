import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-oder-list-form',
  templateUrl: './order-list-form.component.html',
  styleUrls: ['./order-list-form.component.css']
})
export class OrderListFormComponent implements OnInit {

  results: Object;

  constructor(public http: Http, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.updateListOrder();
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
    this.router.navigate(['./check/'+ id], { relativeTo: this.route});
  }
  //open edit order
  editOrder(id: number): void{
    this.router.navigate(['./edit/' + id], { relativeTo: this.route});
  }
  

  //delete order
  deleteOrder(id: number): void{
    this.http.delete('http://localhost:53106/api/order/deleteorder' +id).subscribe((res: any) => this.updateListOrder());
  }
}