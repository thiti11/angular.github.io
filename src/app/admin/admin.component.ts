import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ApiService } from '../api.sercice';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs';
import { MatSort } from '@angular/material/sort';


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
  No_ID:any;
  

  formcancel2: any ={
    Status:null,
  }
 

  constructor(  private StorageService: StorageService, 
    private ApiService:ApiService,
    private Router:Router,
    private toastr:ToastrService,
    private formBuilder:FormBuilder,
    private router:ActivatedRoute,) { 
      this.formcancel2 = this.formBuilder.group({
        Status: ['ยกเลิกการขอ', Validators.required],       
    });
    }

  displayedColumns: string[] = ['no','Name','List',  'Quantity', 'Remark','Date','Cancel','status','approval','Issued','Cancel2'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  ngOnInit(): void {
    this.Get_orderadmin();
    this.currentUser = this.StorageService.getUser();
 
  }


  
 logout(): void {
  this.StorageService.signOut();
  this.Router.navigate(['/login']);
}


Cancel(No_ID:number,Status:string){
  console.log(No_ID,);
  console.log(this.formcancel2.value);
  let data = {
    mod: 'Get_Cancel2', 
    data:No_ID,
    Status: this.formcancel2.value.Status,

  };
 if(Status =='แจ้งยกเลิกรายการ'){
    this.ApiService.read(data).subscribe(data =>{
      console.log(data);
    
      this.toastr.info('ยืนยันรายการสำเร็จ');
    });
    }else{
       // alert('กรุณากรอกข้อมูลให้เรียบร้อยด้วยครับ');
        this.toastr.error('ไม่สามารถอนุมัติการยกเลิกได้');

    }

}





Get_orderadmin(){
    let data = {
      mod: 'Get_orderadmin',  
     // Employee_ID:this.StorageService.getUser().Employee_ID,
      
    };
    this.ApiService.read(data).subscribe(resposne => {
    // console.log(resposne);
    
     this.List = resposne;
     
     this.dataSource = new MatTableDataSource(this.List);   
     this.dataSource.paginator = this.paginator; 
     console.log(this.List);
    });
   
    }
    Filterchange(event: Event) {
      const filvalue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filvalue;
    }



    sign_approval(No_ID:number,Status:string){
      console.log(No_ID,Status);
      if (Status =='ยกเลิกการขอ') {
        this.toastr.error('รายการถูกยกเลิก');
      } else if (Status =='อนุมัติการขอ'){
        this.toastr.error('ไม่สามารถลงชื่ออนุมัติได้');
      }else if (Status =='อนุมัติการส่งมอบ'){
        this.toastr.error('ไม่สามารถลงชื่ออนุมัติได้');
      }else if (Status =='แจ้งยกเลิกรายการ'){
        this.toastr.error('รออนุมัติการขอยกเลิก');
      }
       else {
        this.Router.navigate(['/approval',No_ID]);
     // this.toastr.error('555555');
      }
    }


    sign_Issued(No_ID:number,Status:string){
      console.log(No_ID,Status);
      if(Status =='อนุมัติการส่งมอบ'){
        this.toastr.error('ไม่สามารถลงชื่ออนุมัติส่งมอบได้');
    
    } else if (Status =='ยกเลิกการขอ'){
      this.toastr.error('รายการถูกยกเลิก');
    }
    else if (Status =='แจ้งยกเลิกรายการ'){
      this.toastr.error('รออนุมัติการขอยกเลิก');
    }
    else{
         // this.toastr.error('555555');
     this.Router.navigate(['/Issued',No_ID]);
     }
    }



}
