export class Book {
    constructor(
        public BookID?: number,
        public Name?: string,
        public Author?: string,
        public Rate?: number,
        public Description?: string,
        public Quantity?: number,
        public Price?: number,
        public Status?: string,
        public ImageUrl?: string,
        public PublishDate?: Date,
        public SaleOff?: number,
        public DateCreate?: Date,
        public UserIDCreate?: number,
        public DateUpdate?: Date,
        public UserIDUpdate?: number
    ) { }
}
