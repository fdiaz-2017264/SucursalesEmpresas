import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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

/*-----------------------Register Terminado----------------*/
register(registerForm:any){
    this.comanyRest.register(this.company).subscribe({
      next: (res:any)=>{
        Swal.fire({
          position: 'center',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
          return this.router.navigateByUrl('/login');
      },
      error:(err)=>{
        registerForm.reset();
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error creando la cuenta',
          showConfirmButton: false,
          timer: 1000
        })
      }
      
    })
  }


  
}
