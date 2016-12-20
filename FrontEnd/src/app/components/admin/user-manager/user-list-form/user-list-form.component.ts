import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../../classes/user';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { ContextMenuModule, MenuItem } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { GrowlModule, MessagesModule } from 'primeng/primeng';

@Component({
  selector: 'app-user-list-form',
  templateUrl: './user-list-form.component.html',
  styleUrls: ['./user-list-form.component.css'],
  providers: [ConfirmationService],
})
export class UserListFormComponent implements OnInit {
  results: User[];
  displayDialog: boolean;
  user: User;
  selectedUser: User;
  newUser: boolean;
  Users: User[];
  items: MenuItem[];
  msgs: MessagesModule[] = [];
  constructor(public http: Http, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.updateListUser();
    this.items = [
      { label: 'View', icon: 'fa-search', command: (event) => this.editUser(this.selectedUser.UserID) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteUser(this.selectedUser.UserID) }
    ];
  }

  // render json result to dom
  renderResults(res: any): void {
    this.results = null;
    if (res) {
      this.results = res;
      console.log(this.results);
    }
  }

  //update list user
  updateListUser(): void {
    this.http.get('http://localhost:53106/api/user/GetAllUsers').subscribe((res: any) => this.renderResults(res.json()));

  }


  //open edit user
  public editUser(id: number): void {
    this.router.navigate(['./edit/' + id], { relativeTo: this.route });
  }

  //delete user
  deleteUser(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this user?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.http.delete('http://localhost:53106/api/user/DeleteUser/' + id).subscribe((res: any) => this.updateListUser());
      }
    });

  }

  showDialogToAdd() {
    this.newUser = true;
    this.user = new User(1, '', '', '', '', null, null, null, 1, true);
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.newUser = false;
    this.user = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(c: User): User {
    let user = new User(1, '', '', '', '', null, null, null, 1, true);
    for (let prop in c) {
      user[prop] = c[prop];
    }
    return user;
  }

  findSelectedCarIndex(): number {
    return this.results.indexOf(this.selectedUser);
  }

 
}




