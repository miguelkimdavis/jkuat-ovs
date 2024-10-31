import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(private router: Router) {}

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
}
