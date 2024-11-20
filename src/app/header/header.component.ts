import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isMenuOpen = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('menu-btn');

    if (mobileMenu && hamburger) {
      mobileMenu.classList.toggle('active', this.isMenuOpen);
      hamburger.classList.toggle('active', this.isMenuOpen);
    }
  }

}
