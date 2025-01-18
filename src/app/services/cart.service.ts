import { Injectable } from '@angular/core';

// Define the structure of an item in the cart
interface CartItem {
  productId: number;
  name: string;
  variant: string;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root' // Ensures the service is available globally
})
export class CartService {

  // LocalStorage key for storing the cart data
  private cartKey = 'cart';

  // Method to get the cart from localStorage
  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : []; // Return parsed cart data or an empty array
  }

  // Method to add an item to the cart
  addToCart(productId: number, name: string, variant: string, quantity: number, image: string): void {
    const cart = this.getCart(); // Get current cart from localStorage

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.productId === productId && item.variant === variant);

    if (existingItemIndex > -1) {
      // Item already exists, update the quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Item does not exist, add a new item
      cart.push({ productId, name, variant, quantity, image });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  // Method to update the quantity of an item in the cart
  updateQuantity(productId: number, variant: string, quantity: number): void {
    const cart = this.getCart(); // Get current cart from localStorage

    // Find the item and update its quantity
    const itemIndex = cart.findIndex(item => item.productId === productId && item.variant === variant);

    if (itemIndex > -1) {
      cart[itemIndex].quantity = quantity;
      localStorage.setItem(this.cartKey, JSON.stringify(cart)); // Save updated cart
    }
  }

  // Method to remove an item from the cart
  removeFromCart(productId: number, variant: string): void {
    const cart = this.getCart(); // Get current cart from localStorage

    // Filter out the item to remove it
    const updatedCart = cart.filter(item => !(item.productId === productId && item.variant === variant));

    // Save the updated cart back to localStorage
    localStorage.setItem(this.cartKey, JSON.stringify(updatedCart));
  }

  // Method to clear the entire cart
  clearCart(): void {
    localStorage.removeItem(this.cartKey); // Remove cart data from localStorage
  }
}
