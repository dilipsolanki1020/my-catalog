import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define an interface for Product data (optional, but useful for type safety)
interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  quantity: number;
  stock: boolean;
  images: string[];
  variants: { name: string }[];
}

@Injectable({
  providedIn: 'root' // This makes the service available throughout the app
})
export class ProductService {
  // Path to the products.json file located in the assets folder
  private productsUrl = 'assets/data/products.json';

  // Inject HttpClient to make HTTP requests
  constructor(private http: HttpClient) {}

  // Method to fetch products from the JSON file
  getProducts(): Observable<any> {
    return this.http.get<any>(this.productsUrl);
  }
}
