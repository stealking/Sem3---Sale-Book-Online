import {OrderDetail} from './orderdetail';
export class Order {
    constructor(
        public OrderID?: number,
        public UserID?: number,
        public Date?: string,
        public ReceiverEmail?: string,
        public ReceiverPhone?: string,
        public ReceiverCity?: string,
        public ReceiverAddress?: string,
        public ReceiverDistrict?: string,
        public AddressType?: number,
        public LogisticsCost?: number,
        public Status?: string,
        public Flag?: boolean,
        public OrderDetails?: OrderDetail[]
    ) { }
}