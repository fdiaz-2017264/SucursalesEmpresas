import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';

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

/*
  getCompany(){
    this.companyRest.getIdCompany(this.companyRest.getIdentity()._id).subscribe({
      next: (res:any) =>{this.company = res.company},
      error: (err)=> alert(err.error.message)
    })
  }

*/



  /*
update(){
  this.baseUpdate.password = undefined; 
  this.baseUpdate.role = undefined; 
  this.companyRest.update(this.baseUpdate._id, this.baseUpdate).subscribe({
    next: (res:any)=>{
      this.company = res.company
      this.getCompany();
    },
    error: (err)=> alert(err.error.message)
  })
  }
  */

  update(){
    this.baseUpdate.role = undefined; 
    this.companyRest.updateCompany(this.baseUpdate._id, this.baseUpdate).subscribe({
      next: (res: any) => this.company = res.company,
      error: (err)=> alert(err.error.message)
    })
  }



  getCompany(){
    this.companyRest.getIdCompany(this.companyRest.getIdentity()._id).subscribe({
      next: (res: any) => this.baseUpdate = res.company,
      error: (err)=> alert(err.error.message)
    })
  }









}



