import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.sercice';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

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
    Status:null,

  
  }

  constructor(   private formBuilder:FormBuilder,
     private StorageService: StorageService,
      private ApiService:ApiService,
      private Router:Router,
      private toastr:ToastrService,
      private router:ActivatedRoute) { 
       this.formapproval = this.formBuilder.group({
 
        Approved_By: ['', Validators.required],
        Status: ['อนุมัติการขอ', Validators.required],
       
        
        
    }); }

    displayedColumns: string[] = ['Name','List',  'Quantity', 'Remark','Request_By'];
   

  ngOnInit(): void {

    this.currentUser = this.StorageService.getUser();
    this.Get_approval();
  }


    admin(): void {
  
    this.Router.navigate(['/Admin']);
   }
  
      logout(): void {
        this.StorageService.signOut();
        this.Router.navigate(['/login']);
      }

    Get_By(){
       console.log(this.formapproval.value);
      let data = {
        mod: 'Get_By', 
        data:this.router.snapshot.params['No_ID'],
        
        Approved_By: this.formapproval.value.Approved_By,
        Status: this.formapproval.value.Status,

      };
    
    if(this.formapproval.valid){
      this.ApiService.read(data).subscribe(data =>{
        console.log(data);
      
        this.toastr.info('ยืนยันรายการสำเร็จ');
        this.Router.navigate(['/Admin']);
      
     
          
      });
      }else{
         // alert('กรุณากรอกข้อมูลให้เรียบร้อยด้วยครับ');
          this.toastr.error('กรุณากรอกข้อมูลให้เรียบร้อยด้วยครับ');
  
      }
    }
    
    Get_approval(){
      this.No_ID = this.router.snapshot.params['No_ID'];
      console.log(this.No_ID);
      let data = {
        mod: 'Get_approval',  
        No_ID : this.router.snapshot.params['No_ID'],
       
        
      };
      this.ApiService.read(data).subscribe(resposne => {
       console.log(resposne);
       
       this.List = resposne;
       this.dataSource = new MatTableDataSource(this.List);   
      
       
          
      });
    
      }

}
