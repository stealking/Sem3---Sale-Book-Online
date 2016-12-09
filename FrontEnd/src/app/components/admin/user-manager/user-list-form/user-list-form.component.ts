import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-user-list-form',
  templateUrl: './user-list-form.component.html',
  styleUrls: ['./user-list-form.component.css']
})
export class UserListFormComponent implements OnInit {

  results: Object;

  constructor(public http: Http, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.updateListUser();
  }

  // render json result to dom
  renderResults(res: any): void{
    this.results = null;
    if(res){
      this.results = res;
    }
  }

  //update list user
  updateListUser(): void{
    this.http.get('http://localhost:53106/api/user/GetAllUsers').subscribe((res: any) => this.renderResults(res.json()));
  }

  //open edit user
  editUser(id: number): void{
    this.router.navigate(['./edit/' + id], { relativeTo: this.route});
  }

  //delete user
  deleteUser(id: number): void{
    this.http.delete('http://localhost:53106/api/user/DeleteUser' +id).subscribe((res: any) => this.updateListUser());
  }
}
