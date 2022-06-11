import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyRestService } from '../companyRest/company-rest.service'

@Injectable({
  providedIn: 'root'
})
export class ProductSRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.companyRest.getToken()
  })

  constructor(
    private http:HttpClient,
    private companyRest: CompanyRestService
  ) { }

  getProducSs(){
    return this.http.get(environment.baseUrl + 'productS/getProduct', {headers: this.httpOptions});
  }

  saveProduct(id: string, params:{}){
    return this.http.post(environment.baseUrl + 'createProduct/' + id, params, {headers: this.httpOptions});
  }

  
}
