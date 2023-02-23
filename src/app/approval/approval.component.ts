import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.sercice';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  currentUser: any;
  No_ID:any;
  dataSource:any;
  List:any;

    
  formapproval: any ={
    Approved_By:null,
    Issued_By:null,
  
  }

  constructor(   private formBuilder:FormBuilder,
     private StorageService: StorageService,
      private ApiService:ApiService,
      private Router:Router,
      private router:ActivatedRoute) { 
       this.formapproval = this.formBuilder.group({
        Issued_By: ['', Validators.required],
        Approved_By: ['', Validators.required],
       
        
        
    }); }

    displayedColumns: string[] = ['Name','List',  'Quantity', 'Remark'];
   

  ngOnInit(): void {
  //  this.Get_approval();
    this.currentUser = this.StorageService.getUser();
    this.Get_Orderid();
  }


    admin(): void {
  
    this.Router.navigate(['/Admin']);
   }
  
      logout(): void {
        this.StorageService.signOut();
        this.Router.navigate(['/login']);
      }

  /*  Get_approval(){
      // console.log(this.formapproval.value);
      let data = {
        mod: 'Get_approval', 
        data:this.router.snapshot.params['No_ID'],
        
        Issued_By: this.formapproval.value.Issued_By,
        Approved_By: this.formapproval.value.Approved_By,

      };
      this.ApiService.read(data).subscribe(data =>{
        console.log(data);
      

          
      });
      
    }
    */
    Get_Orderid(){
      let data = {
        mod: 'Get_orderadmin',  
       // Employee_ID:this.StorageService.getUser().Employee_ID,
        
      };
      this.ApiService.read(data).subscribe(resposne => {
       console.log(resposne);
       
       this.List = resposne;
       this.dataSource = new MatTableDataSource(this.List);   
      
       
          
      });
    
      }

}
