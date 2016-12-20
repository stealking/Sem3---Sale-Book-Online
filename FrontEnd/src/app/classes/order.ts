export class Order {
    constructor(
        public OrderID: number,
        public UserID: number,
        public Date?: string,
        public Flag?: boolean
    ) { }
}