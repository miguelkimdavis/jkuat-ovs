import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { FeedBack } from "../model/feedback"

@Injectable({
    providedIn: 'root'
})

export class FeedbackService {
    
    sendFeedBack(name: string, email: string, message: string){
        const feedback = {name:name, email:email, message:message}
        return this.http.post<FeedBack>('https://ovsfeedback-default-rtdb.firebaseio.com/feedback.json', feedback)
    }
    

    constructor(private http: HttpClient) { }
}