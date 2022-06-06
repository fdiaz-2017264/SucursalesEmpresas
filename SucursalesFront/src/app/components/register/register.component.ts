import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  company: CompanyModel;


  constructor(
    private comanyRest: CompanyRestService,
    private router: Router

  ) {
    this.company = new CompanyModel('','','','','','');
    
   }

  ngOnInit(): void {
  }

  register(registerForm:any){
    this.comanyRest.register(this.company).subscribe({
      next: (responsive:any) =>{
        alert(responsive.message);
        return this.router.navigateByUrl('/login');
      },  
      error: (err) =>{
        registerForm.reset();
        return alert(err.error.message || err.error); 
      }
    })
  }

  
}