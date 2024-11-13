import { FeedbackService } from './../services/feedback.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {

  constructor(private router: Router, private feedbackservice: FeedbackService) {}

  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {}

  onFeedBackSubmit(form:NgForm){
    this.isLoading=true
    const name = form.value.name;
    const email = form.value.email;
    const message = form.value.message;
    console.log(form.value);

    if(name=='' || email=='' || message==''){
      this.isLoading=false
      this.errorMessage='Please fill all fields'
      setTimeout(()=>{
        this.errorMessage = null;
      },5000)
    }
    else{
      this.feedbackservice.sendFeedBack(name, email, message) 
      .subscribe({
        next:(res)=>{
          this.isLoading=false
          console.log(res);
        },
        error:(err)=>{
          this.isLoading=false
          this.errorMessage=err.error.message
          setTimeout(()=>{
            this.errorMessage = null;
          },5000)
        },
        complete:()=>{
          this.successMessage='Feedback sent successfully'
          setTimeout(()=>{
            this.successMessage = null;
          },3000)
        }
      }) 
      form.reset();
    }
    }
}
