import { Injectable } from '@angular/core';

@Injectable()
export class BookService {

  constructor() { }
  formatPrice(number: number){
    return (Math.floor(number) + "0VND").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
