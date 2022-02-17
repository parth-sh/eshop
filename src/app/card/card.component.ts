import { Component, Input, OnInit } from '@angular/core';
import { ProductRecieved } from '../models/product-recieved';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() product?: ProductRecieved;
  product_count: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.getProductQuantity();
  }

  getProductQuantity() {
    if (this.product) this.shoppingCartService.getProductQuantity(this.product).then(value => this.product_count = value);
  }

  addToCart() {
    if (this.product) this.shoppingCartService.addToCart(this.product).then(value => this.product_count = value);
  }

  deleteFromCart() {
    if (this.product) this.shoppingCartService.deleteFromCart(this.product).then(value => this.product_count = value);
  }


}
