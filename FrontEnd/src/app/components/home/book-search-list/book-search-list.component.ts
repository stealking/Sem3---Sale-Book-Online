import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-book-search-list',
  templateUrl: './book-search-list.component.html',
  styleUrls: ['./book-search-list.component.css']
})
export class BookSearchListComponent implements OnInit {
  books: Object[];
  rangeValues: number[] = [0, 1000000];
  types: SelectItem[];
  rate: number;
  selectedCity: string;

  constructor(public http: Http, private router: Router, private route: ActivatedRoute) {
    this.rate = 0;
    this.types = [];
    this.types.push({ label: 'Thiếu nhi', value: '1' });
    this.types.push({ label: 'Khoa học', value: '2' });
    this.types.push({ label: 'Tin học', value: '3' });
    this.types.push({ label: 'Xã hội', value: '4' });
    this.types.push({ label: 'Tâm lý', value: '5' });
  }
  ngOnInit() {
    this.updateListBook();
  }
  // render json result to dom
  renderResults(res: any): void {
    this.books = null;
    if (res) {
      this.books = res;
    }
    // console.log(JSON.stringify(this.books));
  }
  // update list book
  updateListBook(): void {
    this.http.get(
      'http://localhost:53106/book/getAll')
      .subscribe((res: any) => this.renderResults(res.json()));
  }
  addZero(num: number): string {
    var str: string = num + '';
    if (num < 100) str = 0 + str;
    if (num < 10) str = 0 + str;
    return str;
  }
}
