import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { User } from '../../../classes/user';
import { Order } from '../../../classes/order';
import { AuthenticationService } from '../../../services/AuthenticationService';
import { EqualValidator } from '../../../services/equal-validator.directive';
import { ButtonModule } from 'primeng/primeng';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = new User(null, '', '', '', null, null, null, null, 2, true);
  public model = new User(null, '', '', '',null,null,null,null,2,true);
  public errorMsg = '';
  public errorMsgRes = '';
  private isExistEmail: boolean;
  results: User[];
  constructor(public router: Router, public http: Http, private _service: AuthenticationService) { }

  ngOnInit() {
    this.updateListUser();
  }

  renderResults(res: any): void {
    this.results = null;
    if (res) {
      this.results = res;
    }
  }

  //update list user
  updateListUser(): void {
    this.http.get('http://localhost:53106/api/user/GetAllUsers').subscribe((res: any) => this.renderResults(res.json()));
  }
  
 

  login() {
    if (!this._service.login(this.user, this.results)) {
      this.errorMsg = 'Đăng nhập không thành công';
      alert("Email hoặc mật khẩu không chính xác")
    } else {
      let order = new Order();
      order.OrderDetails = [];
      localStorage.setItem("order",JSON.stringify(order));
      console.log(JSON.stringify(new Order()));
    }
  }

  register(){
   this.http.get("http://localhost:53106/api/user/CheckExistEmail/?email=" + this.model.Email).subscribe((res: any) => {
      console.log(res.json());
      this.isExistEmail = res.json();
      if (this.isExistEmail == true) {
        this.errorMsgRes = "Email đã tồn tại";
      }
      else {
        if (this._service.register(this.model)) {
          this.errorMsgRes = '';
        }
      }

    });
}}
