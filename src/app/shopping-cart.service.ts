import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { ProductRecieved } from './models/product-recieved';

interface ShoppingCart {
  // Index signature
  [key: string]: number;
}

const SHOPPING_CART_NAME: string = "eshop_cart"

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  // https://stackoverflow.com/a/71162634/9229695
  cart_products_count: number = 1;

  constructor() {
    this.getAllProductsCount().then(value => this.cart_products_count = value)
  }

  private async saveCart(cart: ShoppingCart) {
    await localStorage.setItem(SHOPPING_CART_NAME,
      JSON.stringify(cart)
    );
  }

  private async getOrCreateCart(): Promise<ShoppingCart> {
    let cart = await localStorage.getItem(SHOPPING_CART_NAME);
    let paresedCart: ShoppingCart = JSON.parse(cart as string);
    if (paresedCart) return paresedCart;

    await localStorage.setItem(SHOPPING_CART_NAME,
      JSON.stringify({})
    );
    return {};
  }

  async addToCart(product: ProductRecieved): Promise<number> {
    let cart = await this.getOrCreateCart();
    let product_count = cart[product.key];

    if (product_count !== undefined) {
      cart[product.key] = product_count + 1
    } else {
      cart[product.key] = 1
    }
    this.cart_products_count += 1
    await this.saveCart(cart);
    return cart[product.key]
  }

  async deleteFromCart(product: ProductRecieved): Promise<number> {
    let cart = await this.getOrCreateCart();
    let product_count = cart[product.key];

    if (product_count == 0 || product_count == undefined) return 0;

    cart[product.key] = product_count - 1;
    this.cart_products_count -= 1
    await this.saveCart(cart);
    return cart[product.key]
  }

  async getProductCount(product: ProductRecieved): Promise<number> {
    let cart = await this.getOrCreateCart();
    return cart[product.key] || 0;
  }

  async getAllProductsCount(): Promise<number> {
    let cart = await this.getOrCreateCart();
    let total = 0;

    for (let property in cart) {
      total += cart[property];
    }

    return total;
  }
}
