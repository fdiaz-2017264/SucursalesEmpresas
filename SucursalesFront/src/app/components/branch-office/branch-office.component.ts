import { Component, OnInit } from '@angular/core';
import { OfficeServiceService } from 'src/app/services/OfficeService/office-service.service';
import { OfficeModel } from 'src/app/models/branchOffice.model';

@Component({
  selector: 'app-branch-office',
  templateUrl: './branch-office.component.html',
  styleUrls: ['./branch-office.component.css']
})
export class BranchOfficeComponent implements OnInit {
  offices: any;
  office: OfficeModel;
  officeUpdate: any;



  constructor(
    private officeRest: OfficeServiceService
  ) { 
    this.office = new OfficeModel('','','','', '')
  }

  ngOnInit(): void {
    this.getOffices();
  }

  getOffices(){
    this.officeRest.getOffices().subscribe({
      next: (res:any) => this.offices = res.branchOffices,
      error: (err) => alert(err.error.message)
    })
  }

  getOffice(branchOfficeid: string){
    this.officeRest.getOffice(branchOfficeid).subscribe({
      next: (res:any) => this.officeUpdate = res.branchOffice,
      error: (err) => alert(err.error.message)
    })
  }

  saveOffice(addOfficeForm: any){
    this.officeRest.saveOffice(this.office).subscribe({
      next: (res:any)=>{
        alert(res.message);
        this.getOffices();
        addOfficeForm.reset();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  deleteOffice(id: string){
    this.officeRest.deleteOffice(id).subscribe({
      next: (res:any)=>{
        alert(res.message);
        this.getOffices();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  updateOffice(){
    this.officeRest.updateOffice(this.officeUpdate._id, this.officeUpdate).subscribe({
      next: (res:any)=>{
        alert(res.message);
        this.getOffices();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

}
