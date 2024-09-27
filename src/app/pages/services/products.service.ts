import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, tap } from 'rxjs';
import { Product } from '../../shared/interfaces/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts() {
    const localProducts = localStorage.getItem('products');
    if (localProducts) {
      this.products = JSON.parse(localProducts);
      return of(this.products); // Return an observable
    }

    const URL = environment.jsonBaseApi + 'products.json';
    return this.http.get<Product[]>(URL).pipe(
      tap((res: Product[]) => {
        this.products = res;
        localStorage.setItem('products', JSON.stringify(this.products));
      })
    );
  }

  editProductQuantity(productId: number, quantity: number) {
    const product = this.products.find((p) => p.ProductId === productId);
    if (product) {
      product.AvailablePieces = quantity;
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }

  addProduct(newProduct: Product) {
    let storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    }

    this.products.push(newProduct);

    localStorage.setItem('products', JSON.stringify(this.products));
  }
}
