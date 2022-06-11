import { Component, OnInit } from '@angular/core';
import { ProductsModel } from 'src/app/models/product.model';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { ProductSRestService } from 'src/app/services/productS/product-srest.service';
import { ProductSsModel } from 'src/app/models/prodctS.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any;
  product: ProductsModel;
  productU: any;
  company: CompanyModel;
  value: any = [];
  productModel: ProductSsModel;

  constructor(
    private productRest: ProductRestService,
    private companyRest: CompanyRestService,
    private productSRes: ProductSRestService
  ) {
    this.product = new ProductsModel('', '', 0, '');
    this.company = new CompanyModel('', '', '', '', '', '');
    this.productModel = new ProductSsModel('', 0 , '', '');
    
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCompany();
  }

  getCompany() {
    this.companyRest
      .getIdCompany(this.companyRest.getIdentity()._id)
      .subscribe({
        next: (res: any) => {
          this.company = res.company;
        },
        error: (err) => alert(err.error.message),
      });
  }

  getProducts() {
    this.productRest.getProducts().subscribe({
      next: (res: any) => (this.products = res.searchProduct),
      error: (err) => console.log(err),
    });
  }

  saveProduct(saveProductForm: any) {
    this.productRest.saveProduct(this.product).subscribe({
      next: (res: any) => {
        this.getProducts();
        saveProductForm.reset();
      },
      error: (err) => alert(err.error.message || err.error),
    });
  }

  deleteProduct(id: string) {
    this.productRest.deleteProduct(id).subscribe({
      next: (res: any) => {
        this.getProducts();
      },
      error: (err) => console.log(err),
    });
  }

  getProduct(productId: string) {
    this.productRest.getProduct(productId).subscribe({
      next: (res: any) => (this.productU = res.searchProduct),
      error: (err) => console.log(err),
    });
  }

  updateProduct() {
    this.productRest.updateProduct(this.productU._id, this.productU).subscribe({
      next: (res: any) => {
        this.getProducts();
      },
      error: (err) => console.log(err),
    });
  }

  exportProduct(){
    this.productSRes.saveProduct(this.productU._id, this.productModel).subscribe({
      next: (res: any)=>{
        alert(res.productoS)
      },
      error: (err) => console.log(err.error.message),
    
    })
  }
}
