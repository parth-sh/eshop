import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['title', 'count'];
  products: { key: string, count: number, title: string }[] = [];
  dataSource: Observable<any> = of(null)

  constructor(public shoppingCartService: ShoppingCartService, private productService: ProductService) { }

  async ngOnInit() {
    let cart = await this.shoppingCartService.getOrCreateCart();
    for (let [productId, count] of Object.entries(cart)) {
      if (count > 0) this.productService.getProduct(productId).subscribe(value => {
        this.products.push({ key: productId, count: count, title: value.title })
        this.dataSource = of(this.products)
      });
    }
  }
}
