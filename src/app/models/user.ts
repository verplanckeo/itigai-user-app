export class User{
    id: string;
    token: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;

    constructor(){}

    public static CreateUser(
        username: string,
        password: string,
        firstName: string,
        lastName: string
    ): User{        
        let user =  new User();

        user.username = username;
        user.password = password;
        user.firstName = firstName;
        user.lastName = lastName;

        return user;
    }
}