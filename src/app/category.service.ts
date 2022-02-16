import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of, map } from 'rxjs';
import { CategoryRecieved } from './models/category-recieved';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(): Observable<CategoryRecieved[]> {
    return this.db.object('/categories').valueChanges()
      .pipe(map(categories => {
        let categoriesArr: CategoryRecieved[] = []
        if (!categories) return categoriesArr;

        for (let [key, value] of Object.entries(categories as Object)) {
          categoriesArr.push({ key: key, name: value.name })
        }
        return categoriesArr;
      }));
  }

}
