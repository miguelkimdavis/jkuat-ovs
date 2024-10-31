import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SignupDetailsService } from '../services/signupdetails.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // authservice:AuthService = inject(AuthService);
  isLoading: boolean = false;
  isSignupMode: boolean = true;

  onSignupSwitchMode(){
    this.isSignupMode = !this.isSignupMode;
  }

  onSignupFormSubmit(form:NgForm){
    this.isLoading = true;
    const name = form.value.name;
    const registrationNumber = form.value.registrationNumber;
    const email = form.value.email;
    const password = form.value.password;

    console.log(form.value);


    if(this.isSignupMode){
      this.isLoading = true;
      this.authservice.signup(email, password)
      .subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoading = false;
        },
        error:(err)=>{
          alert(err.message);
          this.isLoading = false;
        }
      })
    }

    this.signupdetailsservice.usersignupdetails(name, registrationNumber, email, password)
    .subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        alert(err.message);
      }
    })


    form.reset();
  }

  constructor(private router: Router,private authservice:AuthService,private signupdetailsservice: SignupDetailsService) { }

  ngOnInit(): void {
  }

}
