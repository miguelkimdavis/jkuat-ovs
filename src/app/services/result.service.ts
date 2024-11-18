import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Results } from '../model/result';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private resultsPath = 'results';
  resultsCollectionRef: AngularFirestoreCollection<Results>;

  constructor(private db: AngularFirestore) {
    this.resultsCollectionRef = this.db.collection(this.resultsPath);
  }

  updateResuts(candidateId: string, data: Results) {
    return this.db
      .collection(this.resultsPath, (ref) => {
        return ref.where('candidateId', '==', candidateId);
      })
      .get()
      .toPromise()
      .then((snapShot) => {
        console.log('update snapshot', snapShot);

        if (snapShot) {
          const items: any = snapShot.docs.map((doc) => {
            const data = doc.data() as object;
            return {
              id: doc.id,
              ...data,
            };
          });
          console.log('results', items);
          const { id, ...dataWithoutId } = items[0];
          return this.db
            .collection(this.resultsPath)
            .doc(items[0].id)
            .update({
              ...dataWithoutId,
              votes: Number(items[0]['votes']) + 1,
            });
        } 
        else {
          return snapShot;
        }
      });
  }
}
