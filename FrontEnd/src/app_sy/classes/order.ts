export class order {
    constructor(
        public OrderID: number,
        public UserID: number,
        public Date?: string,
        public Flag?: boolean
    ) { }
}