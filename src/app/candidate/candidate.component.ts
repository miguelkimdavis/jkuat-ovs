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
  selectedPresident: { id: string | undefined; name: string | undefined } | null = null;
  deputyPresidentCandidates: Candidates[] = [];
  selectedDeputyPresident: { id: string | undefined; name: string | undefined } | null = null; 
  primeMinisterCandidates: Candidates[] = [];
  selectedPrimeMinister: { id: string | undefined; name: string | undefined } | null = null;
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
    
    // loadCandidatesByPosition() {
    //   this.isLoading = true;
    //   this.candidatesservice.getCandidateByPosition('president');
    //   this.candidatesservice.getCandidateByPosition('deputypresident');
    //   this.candidatesservice.getCandidateByPosition('primeminister')
    //     .snapshotChanges()
    //     .pipe(
    //       map((changes) =>
    //         changes.map((c) => ({
    //           id: c.payload.doc.id,
    //           ...c.payload.doc.data(),
    //         }))
    //       )
    //     )
    //     .subscribe((data) => {
    //       this.isLoading = false;
    //       this.presidentCandidates = data.filter(candidate => candidate.position === 'president');
    //       this.deputyPresidentCandidates = data.filter(candidate => candidate.position === 'deputypresident');
    //       this.primeMinisterCandidates = data.filter(candidate => candidate.position === 'primeminister');
    //     });
    // }
    
    // vote(id: string | undefined, name: string | undefined, position: string) {
    //   const selectedCandidate = { id, name };
    //   if (position === 'president') {
    //     this.selectedPresident = selectedCandidate;
    //   } else if (position === 'deputypresident') {
    //     this.selectedDeputyPresident = selectedCandidate;
    //   } else if (position === 'primeminister') {
    //     this.selectedPrimeMinister = selectedCandidate;
    //   }
    // }
    
    // submitVote() {
    //   console.log("Selected President:", this.selectedPresident);
    //   console.log("Selected Deputy President:", this.selectedDeputyPresident);
    //   console.log("Selected Prime Minister:", this.selectedPrimeMinister);
    //   this.successMessage = "Vote submitted successfully";
    //   setTimeout(() => {
    //     this.successMessage = null;
    //   }, 3000);
    // }

  loadCandidatesByPosition(){
    this.isLoading = true;
    this.candidatesservice.getCandidateByPosition('president')
    .snapshotChanges()
    .pipe(
      map((changes)=>{
        return changes.map((c)=>({
          id: c.payload.doc.id,
          ...c.payload.doc.data(),
        }))
      })
    )
    .subscribe((data)=>{
      this.isLoading=false;
      this.presidentCandidates=data;
    })

    this.candidatesservice.getCandidateByPosition('deputypresident')
    .snapshotChanges()
    .pipe(
      map((changes)=>{
        return changes.map((c)=>({
          id: c.payload.doc.id,
          ...c.payload.doc.data(),
        }))
      })
    )
    .subscribe((data)=>{
      this.isLoading=false;
      this.deputyPresidentCandidates=data;
    })

    this.candidatesservice.getCandidateByPosition('primeminister')
    .snapshotChanges()
    .pipe(
      map((changes)=>{
        return changes.map((c)=>({
          id: c.payload.doc.id,
          ...c.payload.doc.data(),
        }))
      })
    )
    .subscribe((data)=>{
      this.isLoading=false;
      this.primeMinisterCandidates=data;
    })
  }

  vote(id: string | undefined, name: string | undefined, position: string) {
    const selectedCandidate = { id, name };
    if (position === 'president') {
      this.selectedPresident = selectedCandidate;
    } 
    else if (position === 'deputypresident') {
      this.selectedDeputyPresident = selectedCandidate;
    } 
    else if (position === 'primeminister') {
      this.selectedPrimeMinister = selectedCandidate;
    }
  }

  submitVote() {
    console.log("Selected President:", this.selectedPresident);
    console.log("Selected Deputy President:", this.selectedDeputyPresident);
    console.log("Selected Prime Minister:", this.selectedPrimeMinister);
    this.successMessage = "Vote submitted successfully";
    setTimeout(() => {
      this.successMessage = null;
      window.location.reload()
    }, 3000);
  }
}