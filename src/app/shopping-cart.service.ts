import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { ProductRecieved } from './models/product-recieved';
import { ShoppingCart } from './models/shopping-cart';

const SHOPPING_CART_NAME: string = "eshop_cart"

@Injectable({
  providedIn: 'root'
})
// TODO: improve cart service can use observable for cart obj
export class ShoppingCartService {

  // TODO: change shopping cart stucture, must be key: {price,count,key,title}; PRIORITY HIGH
  // for iffective price calculation on cart and checkout page 

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

  public async getOrCreateCart(): Promise<ShoppingCart> {
    let cart = await localStorage.getItem(SHOPPING_CART_NAME);
    let paresedCart: ShoppingCart = JSON.parse(cart as string);
    if (paresedCart) return paresedCart;

    await localStorage.setItem(SHOPPING_CART_NAME,
      JSON.stringify({})
    );
    return {};
  }

  clearCart() {
    localStorage.removeItem(SHOPPING_CART_NAME);
    this.cart_products_count = 0
  }

  private async getAllProductsCount(): Promise<number> {
    let cart = await this.getOrCreateCart();
    let total = 0;

    for (let property in cart) {
      total += cart[property];
    }

    return total;
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

}
