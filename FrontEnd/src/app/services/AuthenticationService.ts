import { Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../classes/user';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class AuthenticationService implements OnInit {
    data;
    private loggedIn = false;
    constructor(public http: Http, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void { }


    logout() {
        localStorage.removeItem("user");
        this.loggedIn = false;
    }

    login(user: User, results: User[]) {
        var authenticatedUser = results.find(u => u.Email == user.Email);
        if (authenticatedUser && authenticatedUser.Password == user.Password) {
            authenticatedUser.JustLogin = true;
            localStorage.setItem("user", JSON.stringify(authenticatedUser));
            this.loggedIn = true;
            this.router.navigate(['./home']);
            return true;
        }
        return false;

    }

    register(model: User) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post(
            'http://localhost:53106/api/user/AddUser',
            JSON.stringify(model), options)
            .subscribe((res: Response) => {
                this.data = res.json();
                alert('Add User Successed!');
                this.router.navigate(['./home']);
            })

    }

    checkCredentials() {
        var user = JSON.parse(localStorage.getItem("user"));
        if (user === null) {
            alert('Please Login your account');
            this.router.navigate(['./login']);
        } else if (user.RoleID === 2 && user.JustLogin ) {
            user.JustLogin = false;
            localStorage.setItem("user", JSON.stringify(user));
            this.router.navigate(['./home']);
        } else if (user.RoleID === 1 ) {
            this.router.navigate(['./admin']);
        }

        // if(JSON.parse(localStorage.getItem('user')).UserID === 1){
        //     this.router.navigate(['./admin']);
        // }
        // if(JSON.parse(localStorage.getItem('user')).UserID === 2){
        //     this.router.navigate(['./books']);
        // }
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }
}