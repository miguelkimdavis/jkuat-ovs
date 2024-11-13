import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Candidates } from "../model/candidates";

@Injectable(
    {
        providedIn: "root"
    }
)
export class ResultService {
    constructor(private http:HttpClient){}

    electionResult(name:string, party:string, votes:number){
        const results = {name:name, party:party, votes:votes}
        return this.http.post<Candidates[]>
        ('https://ovs-results-e13ef-default-rtdb.firebaseio.com/results.json',results)
    }
}