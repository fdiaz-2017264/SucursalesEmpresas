import { Component, OnInit } from '@angular/core';
import { ProductSRestService } from 'src/app/services/productS/product-srest.service';

@Component({
  selector: 'app-psucursales',
  templateUrl: './psucursales.component.html',
  styleUrls: ['./psucursales.component.css']
})
export class PsucursalesComponent implements OnInit {

  products: any
  constructor(
    private producS: ProductSRestService
  ) { }

  ngOnInit(): void {
    this.getProductS()

  }

  getProductS(){
    this.producS.getProducSs().subscribe({
      next: (res:any)=> this.products=res.productS,
      error: (err)=> console.log(err)
    })    
  }
}
