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

  ngOnInit(): void {}

  onFeedBackSubmit(form:NgForm){
    this.isLoading=true
    const name = form.value.name;
    const email = form.value.email;
    const message = form.value.message;
    console.log(form.value);

    if(name=='' || email=='' || message==''){
      alert('Please fill all fields');
      this.isLoading=false
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
          alert(err.message);
        },
        complete:()=>{
          alert('Feedback sent successfully');
        }
      }) 
      form.reset();
    }
    }
}
