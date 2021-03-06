import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from './models/product';
import { ProductRecieved } from './models/product-recieved';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  craete(product: Product) {
    this.db.list('/products').push(product);
  }

  getProducts(): Observable<ProductRecieved[]> {
    return this.db.object('/products').valueChanges()
      .pipe(map(products => {
        let productsArr: ProductRecieved[] = []
        if (!products) return productsArr;

        for (let [key, value] of Object.entries(products as Object)) {
          let product = value as Product;
          productsArr.push({ key: key, title: product.title, price: product.price, category: product.category, imageUrl: product.imageUrl })
        }
        return productsArr;
      }));
  }

  getProductsByCategoryFilter(category: string) {
    return this.db.list('/products', ref => ref.orderByChild("category").equalTo(category)).snapshotChanges()
      .pipe(map(snapshotArr => {
        return snapshotArr.map(x => {
          let key = x.payload.key
          let product = x.payload.val() as Product
          return { ...{ key: key }, ...product }
        })
      })) as Observable<ProductRecieved[]>;
  }

  getProduct(productId: string) {
    return this.db.object('/products/' + productId).valueChanges() as Observable<Product>;
  }

  updateProduct(productId: string, product: Product) {
    this.db.object('/products/' + productId).update(product);
  }

  deleteProduct(productId: string) {
    this.db.object('/products/' + productId).remove();
  }
}
