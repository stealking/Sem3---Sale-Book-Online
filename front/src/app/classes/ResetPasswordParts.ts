export class ResetPasswordParts{
    
    constructor(
    public  Email?: string,
    public  Password?: string,
    public  ConfirmPassword?: string,
    public  Expires?: Date,
    public  IsValid?: boolean,
    ){}
}