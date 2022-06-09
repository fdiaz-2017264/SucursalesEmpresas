import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  company: CompanyModel

  constructor(
    private companyRest: CompanyRestService
  ) {
    this.company = new CompanyModel('','','','','','')
   }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany() {
    this.companyRest.getIdCompany(this.companyRest.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.company = res.company
      },
      error: (err) => alert(err.error.message)
    })
  }
}
