export class User{
    constructor(
        public UserID: number,
        public Email: string,
        public Password: string,
        public Name: string,
        public Address: string,
        public DateOfBirth?: string,
        public VisaCode?: string,
        public Phone?: number,
        public RoleID?: number,
        public Flag?:boolean,
        public Button?:string   
    ){}
}