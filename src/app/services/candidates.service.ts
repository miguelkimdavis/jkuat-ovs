import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Candidates } from "../model/candidates";

@Injectable(
    {
        providedIn:'root'
    }
)

export class CandidatesService {
    
    private dbPath = '/candidates'
    candidatesRef:AngularFirestoreCollection<Candidates>

    constructor(private db:AngularFirestore) {
        this.candidatesRef = this.db.collection(this.dbPath, ref => ref.orderBy('position'))
    }

    getAllCandidates():AngularFirestoreCollection<Candidates>{
        return this.candidatesRef
    }

    getCandidateByPosition(position:string):AngularFirestoreCollection<Candidates>{
        return this.db.collection(this.dbPath, ref => ref.where('position', '==', position))
    }
}