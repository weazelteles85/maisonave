export interface URLInterface {
    url: string;
    name: string;
}

export class User {

     

    public NFirst: string;
    public NLast: string;
    public Email: string;
    public Password: string;
    public Address: string;
    public City:string;
    public State:string;
    public Zip: string;
    public PhoneNumber: string;

    public IsAdmin: boolean;
    public IsEditor: boolean;
    public IsSubscriber: boolean;
    public FilesUrl: Array<URLInterface> = new Array<URLInterface>();

    public UserID: string;
    public stripeCustomerId: string;

    constructor(fName: string, lName: string, email:string, password:string, isAdmin:boolean, isEditor:boolean, isSubscriber:boolean) {
        this.NFirst = fName;
        this.NLast = lName;
        this.Email = email;
        this.Password = password;
        this.IsAdmin = isAdmin;
        this.IsEditor = isEditor;
        this.IsSubscriber = isSubscriber;
    }

    setUserId(userID: string) {
        this.UserID = userID;
    }

    setUserStripeId(stripeID:string) {
        this.stripeCustomerId = stripeID;
    }

    setUserAddress(address:string, city:string, state:string, zip:string) {

    }
}