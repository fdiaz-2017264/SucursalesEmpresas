import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  company: CompanyModel;
  baseUpdate:any;

  constructor(
     private companyRest:CompanyRestService,
     public router: Router
     ){
    this.company = new CompanyModel('','','','','','')
   }

  ngOnInit(): void {
    this.getCompany();
  }


/*--------------------Mostrar Datos de la compañia Logiada---------------------*/
getCompany(){
  this.companyRest.getIdCompany(this.companyRest.getIdentity()._id).subscribe({
    next: (res: any) => this.baseUpdate = res.company,
    error: (err)=> alert(err.error.message)
  })
}

/*--------------------Edit the Logged company (ADMIN)--------------------*/
update(){
  this.baseUpdate.role = undefined; 
  this.companyRest.updateCompany(this.baseUpdate._id, this.baseUpdate).subscribe({
    next: (res:any) =>{
      Swal.fire({
        position: 'top-end',
        title: res.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      })
      this.getCompany();
    },
    error: (err) => Swal.fire({
      icon: 'error',
        title: 'Oops...',
        text: 'Hubo un actualizando la cuenta',
        showConfirmButton: false,
        timer: 1000
    })
  })
}

/*-------------------------------Eliminar la Compañia*--------------------------*/
  deleteCompany(){
    this.companyRest.deleteCompany(this.companyRest.getIdentity()._id).subscribe({
      next: (res:any)=>{
        localStorage.removeItem('token'); 
        localStorage.removeItem('identity');
        Swal.fire({
          position: 'top',
          title: res.message,
          icon: 'success',
          showConfirmButton: false, 
          timer: 900
        })
        this.router.navigateByUrl('/login');
      },
      error: (err)=> Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'Hubo un problema, intentalo de nuevo',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

}



