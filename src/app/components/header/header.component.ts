import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // Static data for the shop (can be customized later if needed)
  shopName = 'कृष्ण इलेक्ट्रिकल्स & रिवाइंडिंग';
  shopAddress = 'Sadar Bazar, Near police station, Borunda, Rajasthan';
  logoUrl = 'https://www.shutterstock.com/image-vector/electricity-logo-260nw-416654494.jpg'; // Update this path with the actual logo image location
  buttonText: string = "My Orders";


  constructor(public router: Router) {}

  // Method to navigate to /cart
  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  // Method to navigate to /products
  goToProducts(): void {
    this.router.navigate(['/products']);
  }
  
}
