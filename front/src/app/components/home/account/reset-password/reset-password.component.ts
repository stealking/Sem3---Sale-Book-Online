import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetPasswordParts } from '../../../../classes/ResetPasswordParts';
import { EqualValidator } from '../../../../services/equal-validator.directive';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  digest;
  model = new ResetPasswordParts(null, null, null,null,false);
  errorMsg;
  check = true;
  constructor(public http: Http, public location: Location) {

  }

  ngOnInit() {
    var loc = this.location.path().split("digest=");
    this.digest = loc[1];

    this.http.get("http://localhost:53106/api/Account/ResetPassword/?digest=" + this.digest).subscribe((res: Response) => {
      this.model = res.json();
    });
    
  }

  onSubmit(){
    if(this.model.Password != this.model.ConfirmPassword) return this.errorMsg = "Mật Khẩu Không Trùng Khớp";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put('http://localhost:53106/api/Account/ChangePassword/', JSON.stringify(this.model), options).subscribe((res: Response) => {
          alert('Thiết Lập Mật Khẩu Thành Công!');
          this.check = false;
        })
  }


}