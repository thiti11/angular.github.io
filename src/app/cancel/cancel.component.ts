import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../_services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.sercice';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {
  currentUser: any;
  dataSource:any;
  No_ID:any;
  itemmm:any;
  itemmm1:any;
  itemmm2:any;

  formcancel: any ={
    Cancel:null,
    Status:null,

  
  }
  Router: any;

  constructor( private formBuilder:FormBuilder,
    private StorageService: StorageService,
     private ApiService:ApiService,
     private Route:Router,
     private toastr:ToastrService,
     private router:ActivatedRoute) {
      this.formcancel = this.formBuilder.group({
 
        Cancel: ['', Validators.required],
        Status: ['ตรวจสอบการขอยกเลิก', Validators.required],
  
        
    });
      }

     displayedColumns: string[] = ['Name','List','status'];

  ngOnInit(): void {
    this.Get_Orderr();
    this.currentUser = this.StorageService.getUser();
  }

  logout(): void {
    this.StorageService.signOut();
    this.Route.navigate(['/login']);
  }


  Get_Orderr(){
    this.No_ID = this.router.snapshot.params['No_ID'];
    console.log(this.No_ID);
    
    let data = {
      mod: 'Get_Orderid',  
      Employee_ID:this.StorageService.getUser().Employee_ID,
      No_ID : this.router.snapshot.params['No_ID'],
      
    };
    this.ApiService.read(data).subscribe(resposne => {
      console.log(resposne);
      this.itemmm = resposne;
  //   this.itemmm = resposne[0]['List'];
  //   this.itemmm1 = resposne[0]['Quantity'];
   //  this.itemmm2= resposne[0]['Remark'];
    // console.log(this.itemmm);
    this.dataSource = new MatTableDataSource(this.itemmm);   
    
        
    });
  }


  cancell(){
    console.log(this.formcancel.value);
    let data = {
      mod: 'Get_Cancel', 
      data:this.router.snapshot.params['No_ID'],
      
      Cancel: this.formcancel.value.Cancel,
      Status: this.formcancel.value.Status,

    };
  
 // if(this.formcancel.valid){
    this.ApiService.read(data).subscribe(data =>{
      console.log(data);
    
      this.toastr.info('ยืนยันรายการสำเร็จ');
     // this.Router.navigate(['/order']);
    
   
        
    });
   // }else{
       // alert('กรุณากรอกข้อมูลให้เรียบร้อยด้วยครับ');
    //    this.toastr.error('กรุณากรอกข้อมูลให้เรียบร้อยด้วยครับ');

    //}
  }
  
}
