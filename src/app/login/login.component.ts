import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode: boolean = true;

  onLoginSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onLoginFormSubmit(form:NgForm){
    console.log(form.value);
    form.reset();
    
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
