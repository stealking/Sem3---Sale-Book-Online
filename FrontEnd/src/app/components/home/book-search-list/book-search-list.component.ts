import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SelectItem } from 'primeng/primeng';
import { Subscription } from 'rxjs';
import { BookService } from '../../../services/book.service';
// model
import { Book } from '../../../classes/book';
import { OrderDetail } from '../../../classes/orderdetail';
import { Order } from '../../../classes/order';
// service 
import { BookMultiqueryService } from '../../../services/book-multiquery.service';


export var bookMultiqueryServiceInjectables: Array<any> = [
  { provide: BookMultiqueryService, useClass: BookMultiqueryService }
];


@Component({
  selector: 'app-book-search-list',
  templateUrl: './book-search-list.component.html',
  styleUrls: ['./book-search-list.component.css']
})
export class BookSearchListComponent implements OnInit {
  books: Book[];
  rangeValues: number[] = [0, 400000];
  types: SelectItem[];
  rate: number;
  selectedTypes: string[];
  keyword;
  query = {
    rate: '',
    typeId: [],
    name: '',
    minPrice: '',
    maxPrice: '',
    status: ''
  };
  private subscription: Subscription
  constructor(public http: Http, private router: Router, private route: ActivatedRoute, private queryService: BookMultiqueryService, public bookService: BookService) {
    this.rate = 5;
    this.types = [];
    this.types.push({ label: 'Tất cả', value: null });
    this.types.push({ label: 'Thiếu nhi', value: '8' });
    this.types.push({ label: 'Khoa học', value: '9' });
    this.types.push({ label: 'Tin học', value: '10' });
    this.types.push({ label: 'Xã hội', value: '4' });
    this.types.push({ label: 'Tâm lý', value: '5' });
  }
  ngOnInit() {
    this.updateListBook();
    this.subscription = this.route.queryParams.subscribe(
      (param: any) => {
        let keyWord = param['keyWord'];
        if (keyWord) {
          this.query = {
            rate: '',
            typeId: [],
            name: '',
            minPrice: '',
            maxPrice: '',
            status: ''
          };
          this.query.name = keyWord;
          var queryStr = this.queryService.multiQueryBooks(this.query);
          this.getData(queryStr);
        }

      });
  }
  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }
  // render json result to dom
  renderResults(res: any): void {
    this.books = null;
    if (res) {
      console.log(res)
      this.books = res;
      var bookService = this.bookService;
      this.books.forEach(function (book) {
        book.CurrentPrice = bookService.formatPrice(book.Price * (100 - book.SaleOff));
        book.PublishPrice = bookService.formatPrice(book.Price * 100);
        book.SavePrice = bookService.formatPrice(book.Price * book.SaleOff);
      });
    }
    // console.log(JSON.stringify(this.books[0]));
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  goBook(id: number): void {
    this.router.navigate(['../book/', id], { relativeTo: this.route });
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
  searchBooks() {
    if (this.keyword != undefined) this.query.name = this.keyword;
    this.query.minPrice = Math.floor(this.rangeValues[0] / 1000) + '';
    this.query.maxPrice = Math.floor(this.rangeValues[1] / 1000) + '';
    if (this.rate != undefined) this.query.rate = this.rate + '';
    else { this.query.rate = '' }
    console.log(JSON.stringify(this.selectedTypes));
    if (this.selectedTypes != undefined) {
      var typeId = [];
      var all = false;
      this.selectedTypes.forEach(function (v) {
        typeId.push(v);
        if (v == null) all = true;
      });
      if (all) typeId = [];
      this.query.typeId = typeId;
      console.log(typeId);
    }
    console.log(this.query.typeId);
    var queryStr = this.queryService.multiQueryBooks(this.query);
    this.getData(queryStr);
    // this.query.typeId = this.selectedTypes;
    console.log(queryStr);
    // console.log(this.selectedTypes + " " + this.rate + " " + this.rangeValues + " " + this.keyword);
  }
  getData(queryStr) {
    this.http.get(queryStr)
      .subscribe((res: any) => this.renderResults(res.json()));
  }
  addToCart(book) {
    let order: Order = {};
    order = JSON.parse(localStorage.getItem("order"));
    // let http = this.http;
    let hasBook = false;
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });

    if (!order) {
      order = new Order();
      order.OrderDetails = [];
    }
    else {
      for (let orderDetail of order.OrderDetails) {
        console.log(orderDetail.Book.BookID + " // " + book.BookID);
        if (orderDetail.Book.BookID === book.BookID) {
          hasBook = true;
          // alert(123);
          break;
        } 
      }
    }

    // order.OrderDetails.forEach(function(orderDetail){
    //      if (orderDetail.Book.BookID === book.bookID) {
    //     hasBook = true;
    //     alert(123);
    //   }
    // });
   
    if (hasBook) {
      alert("Sach nay da co trong gio hang");
    } else {

      alert("Dua vao gio hang thanh cong");
      let orderDetail: OrderDetail = {};
      orderDetail.Book = book;
      orderDetail.Flag = true;
      orderDetail.Number = 1;
    
      order.OrderDetails.push(orderDetail);
      console.log(JSON.stringify(order));
      // var orderDetail = new OrderDetail(0, order.OrderID, bookID, 1, true);
      // console.log(JSON.stringify(orderDetail));
      // http.post(
      //   'http://localhost:53106/api/orderdetail/AddOrder',
      //   JSON.stringify(orderDetail), options)
      //   .subscribe((res: Response) => {
      //     alert("Dua vao gio hang thanh cong");
      //   })
    }

    localStorage.setItem("order", JSON.stringify(order));
    // http.get(
    //   'http://localhost:53106/api/order/SearchByUserID/1')
    //   .subscribe(function (ress: any) {
    //     var res = JSON.parse(ress.json());
    //     order = res[0];

    //     if(order){ // neu co order, lay orderdetail

    //       order.OrderDetails
    //     } else {
    //       //
    //     }
    //   });
  }
}