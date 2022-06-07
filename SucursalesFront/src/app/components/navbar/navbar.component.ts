import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:any;

  constructor(
    private companyRest: CompanyRestService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.companyRest.getToken();
  }
  
  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('identity')
    this.router.navigateByUrl('/login');
  }

}
