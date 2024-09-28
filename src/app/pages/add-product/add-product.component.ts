import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProductsService } from '../services/products.service';
import { Product } from '../../shared/interfaces/product.model';
import { MessageService } from 'primeng/api'; // Import MessageService
import { NgForm } from '@angular/forms'; // Import NgForm

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
  ProductImgBase64: string | null = null; // To store the Base64 string
  fileName: string = 'No file chosen'; // Default message

  constructor(
    private productService: ProductsService,
    private messageService: MessageService
  ) {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.products = res;
    });
  }

  addProduct(productForm: NgForm) {
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
          this.ProductImgBase64 ||
          'https://www.decolore.net/wp-content/uploads/2017/04/product-mock-up-set-2.jpg', // Use Base64 string or default image
      };

      this.productService.addProduct(newProduct);

      // Show success message
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product added successfully',
      });

      // Reset form and fields
      this.resetProductFields(productForm);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name; // Update the file name display
      const reader = new FileReader();
      reader.onload = (e) => {
        this.ProductImgBase64 = e.target?.result as string; // Store Base64 string
      };
      reader.readAsDataURL(file); // Read the file as a data URL (Base64)
    } else {
      this.fileName = 'No file chosen'; // Reset if no file
      this.ProductImgBase64 = null; // Reset image URL
    }
  }

  resetProductFields(productForm: NgForm) {
    productForm.resetForm();
    this.ProductImgBase64 = null; // Reset Base64 string
    this.fileName = 'No file chosen'; // Reset file name on reset
  }
}
