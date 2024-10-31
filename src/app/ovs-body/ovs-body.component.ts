import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ovs-body',
  templateUrl: './ovs-body.component.html',
  styleUrls: ['./ovs-body.component.css']
})
export class OvsBodyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
