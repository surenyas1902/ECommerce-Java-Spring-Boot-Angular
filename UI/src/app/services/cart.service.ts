import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: Array<CartItem> = new Array<CartItem>();

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cart: CartItem) {

    let alreadyExists : boolean = false;
    let existingCartItem: CartItem = new CartItem();
    const carts = this.cartItems.filter(data => data.id === cart.id);
    if (carts.length > 0) {
      alreadyExists = true;
      existingCartItem = carts[0];
    }

    if (alreadyExists) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(cart);
    }
  }
}
