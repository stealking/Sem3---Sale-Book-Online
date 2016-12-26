import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// ??
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
export class Contact {
  constructor(
    public Email: string,
    public ContactSubject: string,
    public Content: string,
  ) { }
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  model = new Contact('', '', '');
  constructor(public http: Http, public route: ActivatedRoute, public location: Location, public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(
      'http://localhost:53106/api/email/SendEmail',
      JSON.stringify(this.model), options)
      .subscribe((res: Response) => {
        alert("Gửi thành công! bạn sẽ sớm nhận được phản hồi từ chúng tôi");
        this.model = new Contact('', '', '');
        this.router.navigate(['/home'], { relativeTo: this.route });

      })

  }
  back() {
    this.location.back();

  }

}
