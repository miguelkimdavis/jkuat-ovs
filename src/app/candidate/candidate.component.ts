import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidates } from '../model/candidates';
import { CandidatesService } from '../services/candidates.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
})
export class CandidateComponent implements OnInit {
  candidates?: Candidates[];
  presidentCandidates: Candidates[] = [];
  deputyPresidentCandidates: Candidates[] = [];
  primeMinisterCandidates: Candidates[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: Router,
    private candidatesservice: CandidatesService
  ) {}

  ngOnInit() {
    this.loadCandidatesByPosition()
  }

  retrieveCandidates() {
    this.isLoading = true;
    this.candidatesservice
      .getAllCandidates()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.candidates = data;
      });
  }

  loadCandidatesByPosition(){
    this.isLoading = true;
    this.candidatesservice.getCandidateByPosition('president')
    this.candidatesservice.getCandidateByPosition('deputypresident')
    this.candidatesservice.getCandidateByPosition('primeminister')
    .snapshotChanges()
    .pipe(
      map((changes) =>
        changes.map((c) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data(),
        }))
      )
    )
    .subscribe((data)=>{
      this.isLoading = false;
      this.presidentCandidates = data;
      this.deputyPresidentCandidates = data;
      this.primeMinisterCandidates = data;
    })
  }

  vote(id: string | undefined, name: string | undefined) {
    
  }

  submitVote(){
    this.successMessage = "Vote submitted successfully";
  }

}
