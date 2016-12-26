import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {
  _email: string;
  constructor(public http: Http) { }

  ngOnInit() {
  }

  onSubmit(): void{
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://localhost:53106/api/Account/RequestResetPasswordLink?userName=' + this._email, JSON.stringify(this._email), options)
    .subscribe((res: Response) => { alert("Vui Lòng Kiểm Tra Email Để Lấy Đường Dẫn Thay Đổi Mật Khẩu ")});
  }

}
