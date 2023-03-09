import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ApiService } from '../api.sercice';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentUser: any;
  dataSource:any;
  no=0;
  List: any;

  constructor(  private StorageService: StorageService, 
    private ApiService:ApiService,
    private Router:Router,
    private toastr:ToastrService,) { }
 


 

  displayedColumns: string[] = ['no','Name','List',  'Quantity', 'Remark','approval','Issued',];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngOnInit(): void {
    this.Get_orderadmin();
    this.currentUser = this.StorageService.getUser();
  }


  
 logout(): void {
  this.StorageService.signOut();
  this.Router.navigate(['/login']);
}


Get_orderadmin(){
    let data = {
      mod: 'Get_orderadmin',  
     // Employee_ID:this.StorageService.getUser().Employee_ID,
      
    };
    this.ApiService.read(data).subscribe(resposne => {
     console.log(resposne);
     
     this.List = resposne;
     this.dataSource = new MatTableDataSource(this.List);   
     this.dataSource.paginator = this.paginator; 
        
    });
  
    }

   sign_approval(No_ID:number,Approved_By:string,){
      console.log(No_ID,Approved_By);
      if(Approved_By !=''){
      
        this.toastr.info('ลงชื่อส่งมอบ เรียบร้อย');
      }
      else{
        this.Router.navigate(['/approval',No_ID]);
      }
        
     // this.Router.navigate(['/approval',No_ID]);
    }

    sign_Issued(No_ID:number,Issued_By:string,Approved_By:string){
      console.log(No_ID,Issued_By);
    if(Issued_By !=''){
      
        this.toastr.info('ลงชื่ออนุมัติ เรียบร้อย');
     // this.Router.navigate(['/approval',No_ID]);
     }else{
      this.Router.navigate(['/Issued',No_ID]);
     }
    
}

}
