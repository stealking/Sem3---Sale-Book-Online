import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../classes/book';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
// import { FileUploader } from 'ng2-file-upload';
import { InputTextareaModule, LightboxModule, Message } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  rates = [1, 2, 3, 4, 5];
  statuss = ['New', 'Old','Hot'];
  model = new Book(this.id,'','',5,'',null,null,'default-image.jpg',null,'',null,'',null,null,null,null,'',);
  id: number;
  job: string;
  date1 = new Date();
  msgs: Message[];
  uploadedFiles: any[] = [];
  URL = 'http://localhost:53106/api/book/PostFormData/' + this.id;
  // public uploader:FileUploader;
  


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
    // var URL = 'http://localhost:53106/api/book/PostFormData/' + this.id;
    // this.uploader = new FileUploader({url: URL});
    // this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    }
  }
  
  // submit form
  onSubmit() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    // this.uploader.uploadAll();
    
    if (this.job == "new") {
      this.http.post(
        'http://localhost:53106/api/book/AddBook',
        JSON.stringify(this.model), options)
        .subscribe((res: Response) => {
          alert('Add Book Successed!');
        })
    } else {
      this.model.PublishDate = this.date1;
      this.http.put(
        'http://localhost:53106/api/book/UpdateBook/' + this.id,
        JSON.stringify(this.model), options)
        .subscribe((res: Response) => {
          alert('Update Book Successed!');
          this.reloadPage();
        })
    }
  }

  get diagnostic() {
    return JSON.stringify(this.model)
  }

  newBook() {
    this.model = new Book(this.id,'','',5,'',null,null,'',null,'',null,'',null,null,null,null,'','','');
  }

  back(): void {
    // this.router.navigate(['./'], { relativeTo: this.route });
    this.location.back();
  }

  reloadPage(): void{
    window.location.reload();
  }

   onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
  
}
