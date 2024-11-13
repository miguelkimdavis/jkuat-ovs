import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SignupDetailsService } from '../services/signupdetails.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false;
  isSignupMode: boolean = true;
  signupstatus:boolean=false;
  errorMessage:string|null=null;
  successMessage:string|null=null;

  onSignupSwitchMode() {
    this.isSignupMode = !this.isSignupMode;
  }

  hideSnackBar(){
    setTimeout(()=>{
      this.errorMessage=null;
    },4000)
  }

  onSignupFormSubmit(form: NgForm) {

    this.isLoading = true;
    const name = form.value.name;
    const registrationNumber = form.value.registrationNumber;
    const email = form.value.email;
    const password = form.value.password;
    const confirmPassword = form.value.password;

    if(name=="" || registrationNumber=="" || email=="" || password==""){
      this.errorMessage = "Please Fill All Fields"
      setTimeout(()=>{
        this.errorMessage = null;
      },5000)
    }

    if (this.isSignupMode) {    
    if (confirmPassword !== password){
      this.errorMessage = "Password Does Not Match"
      setTimeout(()=>{
        this.errorMessage = null;
      },5000)
    }
    
      this.authservice.signup(email, password).subscribe({
        next: (res) => {
          this.signupdetailsservice.usersignupdetails(name, registrationNumber, email, password)
            .subscribe({
              next: () => {
                this.isLoading = false;
                this.signupstatus=true;
                if(this.signupstatus){
                  this.successMessage = "Signup Was Successful. Please Login To Continue"
                  setTimeout(()=>{
                    this.successMessage = null;
                  },5000)
                }
                form.reset();
              },
              error:(()=>{
                this.isLoading = false;
              })
            });
        },
        error: (errorMsg) => {
          this.isLoading = false;
          this.errorMessage=errorMsg; 
          setTimeout(()=>{
            this.errorMessage = null;
          },5000)
          this.hideSnackBar()
        },
      });
    }
  }

  constructor(private router: Router, private authservice: AuthService, private signupdetailsservice: SignupDetailsService) {}

  ngOnInit(): void {}
}
