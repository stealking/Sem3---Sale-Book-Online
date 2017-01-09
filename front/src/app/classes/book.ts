export class Book {

    constructor(
        public BookID?: number,
        public Name?: string,
        public Author?: string,
        public Rate?: number,
        public Description?: string,
        public Quatity?: number,
        public Price?: number,
        public CPrice?: number,
        public ImageUrl?: string,
        public PublishDate?: Date,
        public PublishDateString?: string,
        public SaleOff?: number,
        public Status?: string,
        public DateCreate?: Date,
        public UserIDCreate?: number,
        public DateUpdate?: Date,
        public UserIDUpdate?: number,
        public CurrentPrice?: string,
        public PublishPrice?: string,
        public SavePrice?: string
    ) { }
}
