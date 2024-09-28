import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../../shared/interfaces/product.model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  products: Product[] = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products.map((product) => ({
        ...product,
        editing: false,
      }));
    });
  }

  startEditing(product: any) {
    product.editing = true;
  }

  updateQuantity(product: any) {
    this.productService.editProductQuantity(
      product.ProductId,
      product.AvailablePieces
    );
    product.editing = false;
  }
}
