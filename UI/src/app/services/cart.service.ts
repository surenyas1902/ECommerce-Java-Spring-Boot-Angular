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
    const carts = this.cartItems.find(data => data.id === cart.id);
    if (carts) {
      alreadyExists = true;
      existingCartItem = carts;
    }

    if (alreadyExists) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(cart);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    this.cartItems.forEach(row => {
      totalPrice += row.quantity * row.unitPrice;
      totalQuantity += row.quantity;
    });

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    this.logCartData(totalPrice, totalQuantity);
  }

  logCartData(totalPrice: number, totalQuantity: number) {
    console.log("Content of the cart");
    this.cartItems.forEach((row) => {
      const subTotalPrice = row.quantity * row.unitPrice;
      console.log(`Name: ${row.name}, Quantity: ${row.quantity}, Price: ${row.unitPrice}, SubTotal: ${subTotalPrice}`);
    })
    console.log(`Total Price: ${totalPrice.toFixed(2)}, Total Quantity: ${totalQuantity}`);
    console.log(`---------------------`)
  }
  
  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    }
    else {
      this.computeCartTotals();
    }
  }
  remove(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(data => data.id === cartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
    
  }
}
