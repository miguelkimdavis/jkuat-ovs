import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../model/authresponse';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    // http: HttpClient = inject(HttpClient);

    signup(email:string,password:string){
        const data = {email:email,password:password,returnSecureToken:true}
        return this.http.post<AuthResponse>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCaINCH5XhfRiE2GYgSrIe4BwG81vtVpIs',data)
    }


    constructor(private http: HttpClient){}
}