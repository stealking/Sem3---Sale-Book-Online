import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../../classes/user';


@Component({
  selector: 'app-user-list-form',
  templateUrl: './user-list-form.component.html',
  styleUrls: ['./user-list-form.component.css']
})
export class UserListFormComponent implements OnInit {
  results: User[];
  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Email', name: 'Email', filtering: { filtering: '', placeholder: 'Filter by Email' } },
    {
      title: 'Name',
      name: 'Name',
      filtering: { filtering: '', placeholder: 'Filter by name' }
    },
    { title: 'Address', className: ['office-header', 'text-success'], name: 'Address', sort: '0', filtering: { filterString: '', placeholder: 'Filter by address.' } },
    { title: 'Date Of Birth', className: 'text-warning', name: 'DateOfBirth', sort: '' },
    { title: 'Phone.', name: 'Phone', sort: '', filtering: { filterString: '', placeholder: 'Filter by phone.' } },
    { title: 'Action', name: 'Button' }
  ];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 10;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filtering: '' },
    className: ['table-striped', 'table-bordered']
  }

  public data: any = this.results;



  constructor(public http: Http, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {


    this.updateListUser();

    //  console.log(JSON.stringify(this.data));



  }

  // render json result to dom
  renderResults(res: any): void {
    this.results = null;
    if (res) {
      this.results = res;
    }
    this.results.forEach(function (v) {
      // v.Button = "<button>" + v.UserID + "</button>";
      v.Button =
        `<button class="btn btn-primary"><i class="fa fa-1x fa-pencil-square-o" aria-hidden="true" onclick=window.location.href= "/admin/user/editUser/${v.UserID}"></i></button>
       <button class="btn btn-danger"><i class="fa fa-1x fa-times" aria-hidden="true"  onclick="window.location.href('#/admin/user/delete/${v.UserID}')"></i></button>`
    });
    this.data = this.results;
    this.length = this.data.length;
    console.log(JSON.stringify(this.data));
    this.onChangeTable(this.config);

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
    this.http.delete('http://localhost:53106/api/user/DeleteUser' + id).subscribe((res: any) => this.updateListUser());
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }
}


