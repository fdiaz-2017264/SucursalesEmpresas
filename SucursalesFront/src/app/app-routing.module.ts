import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../app/components/home/home.component'
import { BranchOfficeComponent } from './components/branch-office/branch-office.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewCompanyComponent } from './components/view-company/view-company.component';
import {PsucursalesComponent} from './components/psucursales/psucursales.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent}, /* Quitar*/
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'offices', component: BranchOfficeComponent},
  {path:  'view-company', component: ViewCompanyComponent},
  {path: 'productsCompany', component: ProductsComponent},
  {path: 'officeProduct', component: PsucursalesComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
