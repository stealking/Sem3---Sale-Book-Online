import {OrderDetail} from './orderdetail';
export class Order {
    constructor(
        public OrderID?: number,
        public UserID?: number,
        public Date?: string,
        public City?: string,
          public Receiver?: string,
        public District?: string,
        public Address?: string,
        public AddressType?: number,
        public LogisticsCost?: number,
        public Status?: string,
        public Flag?: boolean,
        public OrderDetails?: OrderDetail[]
    ) { }
}