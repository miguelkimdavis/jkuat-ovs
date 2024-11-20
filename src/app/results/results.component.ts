import { map } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Results } from '../model/result';
import { ResultService } from '../services/result.service';
import { Chart, registerables} from 'node_modules/chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  isLoading:boolean = false
  candidateResults?: Results[]
  presidentResults:Results[] = []
  deputyPresidentResults:Results[] = []
  primeMinisterResults:Results[] = []
  
  constructor(private resultservice : ResultService) { }

  ngOnInit(): void {
    this.retrieveResultsByPosition()
  }

  retrieveResults(){
    this.isLoading = true
    this.resultservice.getResults()
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
      this.candidateResults = data
      this.isLoading = false
    })
  }
 

  retrieveResultsByPosition(){
    this.isLoading = true
    this.resultservice.getResultsByPosition('president')
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
      this.isLoading = false
      this.presidentResults = data
    })

    this.resultservice.getResultsByPosition('deputypresident')
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
      this.isLoading = false
      this.deputyPresidentResults = data
    })

    this.resultservice.getResultsByPosition('primeminister')
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
      this.isLoading = false
      this.primeMinisterResults = data
    })
    
  }



}
