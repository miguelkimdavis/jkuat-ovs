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

  ngOnInit(): void {
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;
    console.log(contactForm);
    if (contactForm) {
      contactForm.addEventListener('submit', function (event: Event) {
        event.preventDefault();
        alert('Your message has been sent successfully!');
      });
    }
  }

  onFeedBackSubmit(form:NgForm){
    const name = form.value.name;
    const email = form.value.email;
    const message = form.value.message;
    console.log(name, email, message);
    form.reset();

    this.feedbackservice.sendFeedBack(name, email, message) 
    .subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        alert(err.message);
      }
    }) 
  }
}
