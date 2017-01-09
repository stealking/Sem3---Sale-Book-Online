import { Component, OnInit } from '@angular/core';
import { User } from '../../../../classes/user';
import { AuthenticationService } from '../../../../services/AuthenticationService';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { EqualValidator } from '../../../../services/equal-validator.directive';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.css']
})
export class DetailFormComponent implements OnInit {

  errorMsgCurPass;
  model = new User(1, '', '', '', '', null, null, null, 1, true);
  d: string[];
  changePassUser = [];

  constructor(private _service: AuthenticationService, public http: Http) {
    this.changePassUser = [
      { currentPass: '' },
      { newPass: '' },
      { confirmPass: '' }
    ];
    this.errorMsgCurPass = '';
  }

  ngOnInit() {
    this._service.checkCredentials();
    this.model = JSON.parse(localStorage.getItem('user'));
    this.d = this.model.DateOfBirth.split("T");
  }

  changeDetail() {
    this.model.DateOfBirth = this.d[0];
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(
      'http://localhost:53106/api/user/UpdateUser',
      JSON.stringify(this.model), options)
      .subscribe((res: Response) => {
        alert('Cập nhật thông tin thành công');
      })
  }

  changePassword() {
    if (!this.model.Password == this.changePassUser[0].currentPass) {
      this.errorMsgCurPass = 'Mật Khẩu Không Đúng'
    } else {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.put(
        'http://localhost:53106/api/user/ChangePassword/?id=' + this.model.UserID + '&newPass=' + this.changePassUser[0].newPass, options)
        .subscribe((res: Response) => {
          alert('Đổi mật khẩu thành công');
          window.location.reload();
        })
    }

  }

}
