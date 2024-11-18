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
    candidatesDetails:AngularFirestoreCollection<Candidates>


    constructor
    (
        private db:AngularFirestore,
    ) {
        this.candidatesDetails = this.db.collection(this.dbPath)
    }

    getAllCandidates():AngularFirestoreCollection<Candidates>{
        return this.candidatesDetails
    }

    getCandidateByPosition(position:string):AngularFirestoreCollection<Candidates>{
        return this.db.collection(this.dbPath, ref => ref.where('position', '==', position))
    }

}
