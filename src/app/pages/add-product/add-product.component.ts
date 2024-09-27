import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProductsService } from '../services/products.service';
import { Product } from '../../shared/interfaces/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  Quantity!: number | null;
  ProductPrice!: number | null;
  ProductName!: string | null;
  products: Product[] = [];

  constructor(private productService: ProductsService) {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.products = res;
    });
  }

  addProduct() {
    if (this.Quantity !== null && this.ProductName && this.ProductPrice) {
      const lastProductId =
        this.products.length > 0
          ? Math.max(...this.products.map((p) => p.ProductId))
          : 0;

      const newProduct: Product = {
        ProductId: lastProductId + 1, // Assign the new ProductId
        ProductName: this.ProductName,
        ProductPrice: this.ProductPrice,
        AvailablePieces: this.Quantity,
        ProductImg:
          'https://www.decolore.net/wp-content/uploads/2017/04/product-mock-up-set-2.jpg',
      };

      this.productService.addProduct(newProduct);
      this.resetProductFields();
    }
  }

  resetProductFields() {
    this.Quantity = null;
    this.ProductPrice = null;
    this.ProductName = null;
  }

  onProductSelect(selectedProduct: Product) {
    this.ProductName = selectedProduct.ProductName;
    this.ProductPrice = selectedProduct.ProductPrice;
  }
}
