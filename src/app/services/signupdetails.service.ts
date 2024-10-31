import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SignUpDetail } from "../model/signupdetail";

@Injectable({
    providedIn: 'root'
})

export class SignupDetailsService {
    
    usersignupdetails(name:string,registrationNumber:string,email:string,password:string){
        const user = {name:name,registrationNumber:registrationNumber,email:email,password:password}

        return this.http.post<SignUpDetail>
        ('https://ovsauthentication-default-rtdb.firebaseio.com/user.json', user);
    }
    
    constructor(private http: HttpClient) { }
}