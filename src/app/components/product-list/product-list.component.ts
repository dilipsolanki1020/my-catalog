import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

interface Variant {
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  quantity: number;
  stock: boolean;
  images: string[];
  variants: Variant[];
  selectedVariant?: Variant;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];  // Store products here
  isLoading: boolean = true;  // Track loading state
  selectedVariant: string = '';  // For storing the selected variant

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    // Correctly access the 'products' array from the response object
    this.productService.getProducts().subscribe(response => {
      // Simulate loading time
      setTimeout(() => {
        this.isLoading = false;
        // Ensure we're accessing the 'products' array in the response
        if (response && response.products) {
          this.products = response.products.map((product: Product) => {
            product.selectedVariant = product.variants.length > 0 ? product.variants[0] : { name: '' };
            return product;
          });
        }else {
          console.error('No products found in response', response);
        }
      }, 300); // Simulated delay
    });
  }

  // Method to add a product to the cart
  addToCart(product: Product, variant: string, quantity: number): void {
    if (quantity > 0 && product.selectedVariant) {
      this.cartService.addToCart(
        product.id,
        product.name,
        product.selectedVariant.name,
        quantity,
        product.images[0]
      );
    }
  }
}
