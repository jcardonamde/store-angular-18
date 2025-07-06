import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  constructor() {}

  /**
   * Fetches products from the API and cleans up the image URLs.
   * @returns An observable of an array of products with cleaned image URLs.
   */
  getProducts() {
    return this.http
      .get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .pipe(
        map((products) =>
          products.map((product) => ({
            ...product,
            images: product.images.map((image) =>
              this.cleanAndParseImageUrl(image)
            ),
          }))
        )
      );
  }

  private cleanAndParseImageUrl(image: string): string {
    let cleanedImage = image.replace(/^\["?|"?]$/g, '');
    try {
      cleanedImage = JSON.parse(cleanedImage);
    } catch (error) {}
    return cleanedImage;
  }

  // getProducts() {
  //   return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products');
  // }

  // getProducts() {
  //   return this.http.get<Product[]>('https://fakestoreapi.com/products');
  // }
}
