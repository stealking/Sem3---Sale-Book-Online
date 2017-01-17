import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { User } from '../../../../classes/user';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {SelectItem} from 'primeng/primeng';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  data;
  roleIDs: SelectItem[];
  selectedRole: string;
  date = new Date(Date.now());
  model = new User(1,	'',	'',	'',	'', this.date.getFullYear() + '/'+this.date.getMonth() +'/' + this.date.getDay()	,	null ,	null , 	1,	true);
  id: number;
  job: string;
  d: string[];
  
  
  constructor(public http: Http, public route: ActivatedRoute, public location: Location, public router: Router) { 
    this.roleIDs = [];
    this.roleIDs.push({ label: 'Admin', value: 1 });
    this.roleIDs.push({ label: 'User', value: 2 });
     route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) this.job = 'edit'; else this.job = 'new';
    })

  }

  onSubmit(){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    if(this.job === 'new'){
      this.http.post(
      'http://localhost:53106/api/user/AddUser',
      JSON.stringify(this.model), options)
      .subscribe((res: Response) =>{
           this.data = res.json();
           alert('Add User Successed!');
      })
    }
    else{
      this.http.put(
      'http://localhost:53106/api/user/UpdateUser',
      JSON.stringify(this.model), options)
      .subscribe((res: Response) =>{
           this.data = res.json();
           alert('Update User Successed');
      })
    }
    
  }


  ngOnInit(): void {
    if (this.job === 'edit') {
      this.http.get(
        'http://localhost:53106/api/user/GetUserById/' + this.id)
        .subscribe((res: Response) => {
          this.model = <User>res.json();
          this.d = this.model.DateOfBirth.split("T");
          this.model.DateOfBirth = this.d[0];
        })
    }
  }

  newUser() {
    this.model = new User(1,null,	null,	null,	null, null	,	null ,	null , 	1,	true);
  }

  back(): void {
    this.location.back();
    // this.router.navigate(['./'], { relativeTo: this.route });
    // alert(123);
    // this.router.navigate(['/book']);
  }

}
