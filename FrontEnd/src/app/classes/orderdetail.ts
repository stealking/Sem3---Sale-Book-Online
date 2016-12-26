import {Book} from './book';
export class OrderDetail {
    constructor(
        public ID?: number,
        public OrderID?: number,
        public BookID?: number,
        public Number?: number,
        public Flag?: boolean,
        public Book?:Book
    ) { }
}