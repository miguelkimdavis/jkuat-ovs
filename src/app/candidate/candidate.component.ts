import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectionService } from '../services/election.service';
import { Candidates } from '../model/candidates';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
})

export class CandidateComponent implements OnInit {
  
  presidentData: Candidates[] = [];
  deputyPresidentData: Candidates[] = [];
  selectedCandidate: Candidates | null = null;
  isLoading: boolean = false;

  constructor(
    private route: Router,
    private http: HttpClient,
    private electionservices: ElectionService,
  ) {}

  ngOnInit() {
    this.viewPresident();
    this.viewDeputyPresident()
  }

  viewPresident() {
    this.isLoading=true
    this.electionservices.presidentialElection()
    .subscribe({
      next: (data: Candidates[]) => {
        this.isLoading=false
        this.presidentData = Object.values(data);
        console.log(data);
      },
      error: () => {
        alert('Error Fetching Data');
      },
    });
  }

  viewDeputyPresident() {
    this.isLoading=true
    this.electionservices.deputyPresidentElection()
    .subscribe({
      next:(data:Candidates[])=>{
        this.isLoading=false
        this.deputyPresidentData = Object.values(data);
        console.log(data)
      },
      error:()=> {
        alert('Error Fetching Data');
      }
    })
  }

  voteCandidate(candidate:Candidates){
    this.selectedCandidate=candidate;
    console.log(candidate)
  }

  submitVote(){ }

}
