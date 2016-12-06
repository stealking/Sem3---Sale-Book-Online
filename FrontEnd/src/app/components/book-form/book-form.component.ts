import { Component, OnInit } from '@angular/core';
import { Book } from '../../classes/book';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  data;
  rates = [1, 2, 3, 4, 5];
  model = new Book(1, 'Mui oai huong', 'Dat', this.rates[0]);
  submitted = false;
  onSubmit() {
    this.submitted = true;
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(
      'http://localhost:53106/api/book/AddBook',
      JSON.stringify(this.model), options)
      .subscribe((res: Response) =>{
           this.data = res.json();
           alert(JSON.stringify(res.json()));
      })
  }
  get diagnostic() {
    return JSON.stringify(this.model)
  }
  newHero() {
    this.model = new Book(41, '', '', 3);
  }
  constructor(public http: Http) { }

  ngOnInit() {
     this.http.get(
      'http://localhost:53106/book/getAll')
      .subscribe((res: Response) =>{
           this.data = JSON.stringify(res.json());
           alert(JSON.stringify(res.json()));
      })
  }

}
