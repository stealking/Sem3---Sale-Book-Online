import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  results: Object;
  public data: any = this.results;
  settings = {
    columns: {
      BookID: {
        title: 'Book ID'
      },
      Name: {
        title: 'Name'
      },
      Author: {
        title: 'Author'
      },
      Rate: {
        title: 'Rate'
      }
    }
  };


  constructor(public http: Http, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.updateListBook();
  }

  // render json result to dom
  renderResults(res: any): void {
    this.results = null;
    if (res) {
      this.results = res;
    }
    this.data = this.results;
    console.log(JSON.stringify(this.data));
  }
  // update list book
  updateListBook(): void {
    this.http.get(
      'http://localhost:53106/book/getAll')
      .subscribe((res: any) => this.renderResults(res.json()));
  }
  // open edit book
  editBook(id: number): void {
    this.router.navigate(['./edit/', id], { relativeTo: this.route });
  }
  //
  deleteBook(id: number): void {
    alert(id);
    this.http.delete(
      'http://localhost:53106/api/book/DeleteBook/' + id)
      .subscribe((res: any) => this.updateListBook());
  }
}