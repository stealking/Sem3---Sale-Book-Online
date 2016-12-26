import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { User } from '../../../classes/user';
import { AuthenticationService } from '../../../services/AuthenticationService';
import { EqualValidator } from '../../../services/equal-validator.directive';
import { ButtonModule } from 'primeng/primeng';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = new User(null, '', '', '', '', null, null, null, 1, true);
  public model = new User(null, '', '', '', '', null, null, null, 1, true);
  public errorMsg = '';
  public errorMsgRes = '';
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
      this.errorMsg = 'Failed to login';
    }
  }

  register(){
    if (!this._service.register(this.model)) {
      this.errorMsgRes = 'Failed to register';
    }
  }
}
