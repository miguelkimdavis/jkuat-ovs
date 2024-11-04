import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  isLoginMode: boolean = true;
  loginstatus: boolean = false;
  errorMessage:string|null=null;


  onLoginSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  
  hideSnackBar(){
    setTimeout(()=>{
      this.errorMessage=null;
    },4000)
  }

  onLoginFormSubmit(form:NgForm){

    this.isLoading = true;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;

    if(username == '' || email == '' || password == ''){
      alert('Please fill all fields');
    }

    if(this.isLoginMode){
      this.authService.login(email, password).subscribe({
        next:()=>{
          this.loginstatus = true;
          this.isLoading = false;
          if(this.loginstatus){
            alert('Login successful');
          }
        },
        error: (errorMsg) => {
          this.isLoading = false;
          this.errorMessage=errorMsg; 
          this.hideSnackBar()
        },
      })

    }
    console.log(form.value);
    form.reset();
    

  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

}
