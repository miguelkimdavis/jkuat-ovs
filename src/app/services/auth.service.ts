import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../model/authresponse';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    signup(email:string,password:string){
        const data = {email:email,password:password,returnSecureToken:true}
        return this.http.post<AuthResponse>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCaINCH5XhfRiE2GYgSrIe4BwG81vtVpIs',data)
        .pipe(catchError(this.handleError))
    }

    login(email:string,password:string){
        const data = {email:email,password:password,returnSecureToken:true}
        return this.http.post<AuthResponse> 
        ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCaINCH5XhfRiE2GYgSrIe4BwG81vtVpIs',data)
        .pipe(catchError(this.handleError))

    }

    private handleError(err:any){
        let errorMessage = "ERROR ! PLEASE TRY AGAIN"
        if(!err.error || !err.error.error){
            return throwError(()=>errorMessage)
        }
        switch (err.error.error.message){
            case"EMAIL_EXISTS":
                errorMessage="Email already exists"
                break;
            case "OPERATION NOT ALLOWED":
                errorMessage="This operation not allowed"
                break;
            case "EMAIL-NOT-FOUND":
                errorMessage="This email does not exist"
                break;
            case "INVALID_PASSWORD":
                errorMessage="Invalid password"
                break;
            case "USER_DISABLED":
                errorMessage="User disabled"
                break;
            
        }
        return throwError(()=>errorMessage)
    }

    constructor(private http: HttpClient){}
}
