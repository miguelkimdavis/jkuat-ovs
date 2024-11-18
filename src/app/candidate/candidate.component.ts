import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidates } from '../model/candidates';
import { CandidatesService } from '../services/candidates.service';
import { ResultService } from './../services/result.service';
import { map } from 'rxjs';
import { Results } from '../model/result';
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
})
export class CandidateComponent implements OnInit {
  candidates?: Candidates[];
  candidatesResult? : Results[];
  currentId: string = '';
  presidentCandidates: Candidates[] = [];
  selectedPresident?: Candidates;
  deputyPresidentCandidates: Candidates[] = [];
  selectedDeputyPresident?: Candidates;
  primeMinisterCandidates: Candidates[] = [];
  selectedPrimeMinister?: Candidates;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: Router,
    private candidatesservice: CandidatesService,
    private resultservice: ResultService
  ) {}

  ngOnInit() {
    this.loadCandidatesByPosition();
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

  loadCandidatesByPosition() {
    this.isLoading = true;
    this.candidatesservice
      .getCandidateByPosition('president')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }));
        })
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.presidentCandidates = data;
      });

    this.candidatesservice
      .getCandidateByPosition('deputypresident')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }));
        })
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.deputyPresidentCandidates = data;
      });

    this.candidatesservice
      .getCandidateByPosition('primeminister')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }));
        })
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.primeMinisterCandidates = data;
      });
  }

  submitVote() {
    this.isLoading = true;
    this.voteForCandidate(this.selectedPresident, "President")
      .then(() => this.voteForCandidate(this.selectedDeputyPresident, "Deputy President"))
      .then(() => this.voteForCandidate(this.selectedPrimeMinister, "Prime Minister"))
      .finally(() => (this.isLoading = false));
  }
  
  private voteForCandidate(candidate: Candidates | undefined, position: string) {
    if (!candidate) {
      this.errorMessage = `Please select a candidate for ${position}.`;
      console.error(this.errorMessage);
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
      return Promise.resolve();
    }
  
    console.log(`Voting for ${position} Candidate:`, candidate);
  
    const updatedVotes = (candidate.votes || 0) + 1;
  
    return this.resultservice
      .updateResuts(candidate.id!, { candidateId: candidate.id!, votes: updatedVotes })
      .then(() => {
        this.successMessage = `${position} vote submitted successfully!`;
        console.log(this.successMessage);
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      })
      .catch((error) => {
        this.errorMessage = `Error submitting ${position} vote: ${error.message}`;
        console.error(this.errorMessage);
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      });
  }
  
}