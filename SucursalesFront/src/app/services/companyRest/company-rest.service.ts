import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'; 
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CompanyRestService {

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.getToken());


  constructor(private http: HttpClient) { }

  prueba(){
    return this.http.get(environment.baseUrl + 'empresa/pruebaEmpresa', {headers: this.httpOptions});
  }

  register(params:{}){
    return this.http.post(environment.baseUrl + 'empresa/saveEmpresa', params, {headers: this.httpOptions});
  }

  login(params:{}){
    return this.http.post(environment.baseUrl + 'empresa/loginCompany', params, {headers: this.httpOptions});
  }

  getIdCompany(id: string){
    return this.http.get(environment.baseUrl + 'empresa/getIdCompany/'+ id, {headers: this.httpOptions});
  }
    
  getToken(){
    let globalToken = localStorage.getItem('token');
    let token; 
    if(globalToken != undefined){
      token = globalToken;
    }else{
      token = ''
    }
    return token; 
  }  

  getIdentity() {
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if (globalIdentity != undefined) {
      identity = JSON.parse(globalIdentity);
    } else {
      identity = '';
    }
    return identity;
  }

}

