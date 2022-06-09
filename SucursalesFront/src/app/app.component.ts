import { Component, OnInit } from '@angular/core';
import { ProductSRestService } from './services/productS/product-srest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'SucursalesFront';

  constructor(
    private producS: ProductSRestService
  ){}

  ngOnInit(): void {
    this.getProductS()
  }
  
  getProductS(){
    this.producS.getProducSs().subscribe({
      next: (res:any)=> console.log(res),
      error: (err)=> console.log(err)
    })    
  }
}
