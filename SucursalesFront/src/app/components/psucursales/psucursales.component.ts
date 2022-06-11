import { Component, OnInit } from '@angular/core';
import { ProductSRestService } from 'src/app/services/productS/product-srest.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js'

@Component({
  selector: 'app-psucursales',
  templateUrl: './psucursales.component.html',
  styleUrls: ['./psucursales.component.css']
})
export class PsucursalesComponent implements OnInit {
  public pieChartType: ChartType = 'pie';
  products: any
  name:any = []
  value:any = []

  constructor(
    private producS: ProductSRestService
  ) {

  }

  ngOnInit(): void {
    this.getProductS();
  }

  public pieChartData = {
    labels: this.name,
    datasets: [{
      data: this.value
    }]
  };



  getProductS() {
    this.producS.getProducSs().subscribe({
      next: (res: any) => {
        this.products = res.productS
        console.log(res)
        for(const pd of res.productS){
          this.name.push(pd.name)
          this.value.push(parseInt(pd.stock))
        }
        console.log(this.name, this.value)
      },
      error: (err) => console.log(err)
    })
  }
}
