import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { user } from '../../../../classes/user';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  data;
  date = new Date(Date.now());
  model = new user(1,	'tansy91@gmail.com',	'12345',	'Trần Tấn Sỹ',	'214 Ngô Quyền', this.date.getFullYear() + '/'+this.date.getMonth() +'/' + this.date.getDay()	,	null ,	null , 	1,	true);
  id: number;
  job: string;
  
  
  
  constructor(public http: Http, public route: ActivatedRoute, public location: Location, public router: Router) { 
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
           alert(JSON.stringify(res.json()));
      })
    }
    else{
      this.http.put(
      'http://localhost:53106/api/user/UpdateUser',
      JSON.stringify(this.model), options)
      .subscribe((res: Response) =>{
           this.data = res.json();
           alert(JSON.stringify(res.json()));
      })
    }
    
  }


  ngOnInit(): void {
    if (this.job === 'edit') {
      
      this.http.get(
        'http://localhost:53106/api/user/GetUserById/' + this.id)
        .subscribe((res: Response) => {
          
          this.model = <user>res.json();
          
        })
    
    }
  }

  newUser() {
    this.model = new user(1,	'tansy91@gmail.com',	'12345',	'Trần Tấn Sỹ',	'214 Ngô Quyền', null	,	null ,	null , 	1,	true);
  }

  back(): void {
    // this.location.back();
    this.router.navigate(['./'], { relativeTo: this.route });
    // alert(123);
    // this.router.navigate(['/book']);
  }

}
