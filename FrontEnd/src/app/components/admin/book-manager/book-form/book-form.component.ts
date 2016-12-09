import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../classes/book';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// ??
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  rates = [1, 2, 3, 4, 5];
  model = new Book(this.id, '', '', 0);
  id: number;
  job: string;
  constructor(public http: Http, public route: ActivatedRoute, public location: Location, public router: Router) {
    route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) this.job = 'edit'; else this.job = 'new';
    })
  }


  ngOnInit(): void {
    // check if in edit page
    if (this.job === 'edit') {
      this.http.get(
        'http://localhost:53106/api/book/getbookbyid/' + this.id)
        .subscribe((res: Response) => {
          this.model = <Book>res.json();
        })
    }
  }
  // submit form
  onSubmit() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    if (this.job == "new") {
      this.http.post(
        'http://localhost:53106/api/book/AddBook',
        JSON.stringify(this.model), options)
        .subscribe((res: Response) => {
          alert(JSON.stringify(res.json()));
        })
    } else {
      this.http.put(
        'http://localhost:53106/api/book/UpdateBook/' + this.id,
        JSON.stringify(this.model), options)
        .subscribe((res: Response) => {
          alert(JSON.stringify(res.json()));
        })
    }
  }

  get diagnostic() {
    return JSON.stringify(this.model)
  }

  newBook() {
    this.model = new Book(1, 'â', 'â', 1);
  }

  back(): void {
    this.router.navigate(['./'], { relativeTo: this.route });
  }

}
