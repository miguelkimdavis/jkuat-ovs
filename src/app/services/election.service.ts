import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Candidates } from "../model/candidates";

@Injectable(
    {
        providedIn: 'root'
    }
)

export class ElectionService {

    constructor(private http:HttpClient) {}

    presidentialElection() {
        return this.http.get<Candidates[]>
        ('https://ovs-candidates-default-rtdb.firebaseio.com/president.json')
    }
    deputyPresidentElection(){
        return this.http.get<Candidates[]>
        ('https://ovs-candidates-default-rtdb.firebaseio.com/deputypresident.json')
    }
}