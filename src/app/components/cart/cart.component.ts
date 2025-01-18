import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

interface CartItem {
  productId: number;
  name: string;
  variant: string;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Retrieve the cart items when the component is initialized
    this.cartItems = this.cartService.getCart();
  }

  // Method to remove an item from the cart
  removeItem(productId: number, variant: string): void {
    this.cartService.removeFromCart(productId, variant);
    this.cartItems = this.cartService.getCart(); // Refresh the cart items
  }

  // Method to update the quantity of an item in the cart
  updateQuantity(productId: number, variant: string, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, variant, quantity);
      this.cartItems = this.cartService.getCart(); // Refresh the cart items
    }
  }

  // Method to clear the entire cart (optional)
  GenerateOrder(): void {
    // Send the order details to WhatsApp first
    this.sendOrderToWhatsApp();

    // Clear the cart
    this.cartService.clearCart();
    this.cartItems = []; // Empty the cart array after clearing it
  }

  private sendOrderToWhatsApp(): void {
    const phoneNumber = '9284722329'; // Replace with the recipient's phone number (with country code, no '+')
    const message = this.formatOrderMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

   // Method to format the cart message for WhatsApp
   private formatOrderMessage(): string {
    let message = 'My Order:\n';
    this.cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} ( ${item.variant} )\n -Quantity: ${item.quantity}\n`;
    });
    return message;
  }

  // Method to get the total number of items in the cart
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Method to calculate the total quantity of products in the cart
  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}
