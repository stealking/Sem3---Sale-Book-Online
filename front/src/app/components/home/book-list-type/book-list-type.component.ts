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

@Component({
  selector: 'app-book-list-type',
  templateUrl: './book-list-type.component.html',
  styleUrls: ['./book-list-type.component.css']
})
export class BookListTypeComponent implements OnInit {
  private title;
  private books;
  constructor(public http: Http, private router: Router, private route: ActivatedRoute, private queryService: BookMultiqueryService, public bookService: BookService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      switch(params['status']){
        case "highlight": this.title = "Nổi bật";break;
        case "bestselling": this.title = "Bán chạy";break;
        case "sell-off": this.title = "Giảm giá";break;
      };
      let status = params['status'];
      if (status) {
        let query = {
          rate: '',
          typeId: [],
          name: '',
          minPrice: '',
          maxPrice: '',
          status: ''
        };
        query.status = status;
        var queryStr = this.queryService.multiQueryBooks(query);
        this.getData(queryStr);
      }
    });
  }
  getData(queryStr) {
    this.http.get(queryStr)
      .subscribe((res: any) => this.renderResults(res.json()));
  }
  renderResults(res: any): void {
    console.log(JSON.stringify(res));
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
   }
   goBook(id: number): void {
    this.router.navigate(['../book/', id], { relativeTo: this.route });
  }
}
