import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  company: CompanyModel;

  constructor(
    private companyRest: CompanyRestService,
    private router: Router
  ) {
    this.company = new CompanyModel('','','','','','');

   }

  ngOnInit(): void {
  }

  login(){
    this.companyRest.login(this.company).subscribe({
       next: (res:any)=>{
          alert(res.message);
          localStorage.setItem('token', res.token);
          localStorage.setItem('identity', JSON.stringify(res.already));
          this.router.navigateByUrl('/productsCompany');
       },
       error: (err)=> alert(err.error.message || err.error)
    })
 }
}
