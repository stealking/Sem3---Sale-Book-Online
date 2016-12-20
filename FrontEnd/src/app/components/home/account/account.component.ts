import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/AuthenticationService';
import { User } from '../../../classes/user';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  model = new User(1,	'',	'',	'',	'', null,	null ,null , 	1,	true);
  constructor(private _service:AuthenticationService) { }

  ngOnInit() {
    this._service.checkCredentials();
    this.model = JSON.parse(localStorage.getItem('user'));
  }

}
