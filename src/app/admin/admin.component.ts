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
 


 

  displayedColumns: string[] = ['no','Name','List',  'Quantity', 'Remark','approval',];

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

    sign_approval(No_ID:number,Approved_By:string,Issued_By:string){
      console.log(No_ID,Approved_By,Issued_By);
      if(Approved_By !=''){
      
        this.toastr.info('ออเดอร์นี้ได้ อนุมัติเรียบร้อยแล้ว');
      }
      else{
        this.Router.navigate(['/approval',No_ID]);
      }
        
     // this.Router.navigate(['/approval',No_ID]);
    }
    
}


