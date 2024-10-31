import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../model/authresponse';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    // http: HttpClient = inject(HttpClient);


    signup(email:string,password:string){
        const data = {email:email,password:password,returnSecureToken:true}
        return this.http.post<AuthResponse>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCaINCH5XhfRiE2GYgSrIe4BwG81vtVpIs',data)
        .pipe(catchError(err=>{
            let errorMessage = "An Unknown Error Has Occurred"
            if(!err.error || !err.error.error){
                return throwError(()=>errorMessage)
            }
            switch (err.error.error.message){
                case"EMAIL_EXISTS":
                    errorMessage="Email already exists"
                break;
                case "OPERATION NOT ALLOWED":
                    errorMessage="This operation not allowed"
                
            }
            return throwError(()=>errorMessage)
        }))
    }

    login(email:string,password:string){
        const data = {email:email,password:password,returnSecureToken:true}
        return this.http.post<AuthResponse> 
    }

    private handleError(){
        
    }

    constructor(private http: HttpClient){}
}
