import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CompanyRest} from ''

@Injectable({
  providedIn: 'root'
})
export class ProductSRestService {
  httpOpcions = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', CompanyRest.getToken());

  constructor(
    private http:HttpClient
  ) { }

  getProducSs(){
    return this.http.get(environment.baseURI + 'productS/getProduct', {headers: this.httpOpcions});
  }

  
}
