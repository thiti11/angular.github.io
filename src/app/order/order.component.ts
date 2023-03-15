import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.sercice';
import { StorageService } from '../_services/storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  currentUser: any;
  List: any;
  dataSource:any;
  no=0;
  modalRef?: BsModalRef;


  displayedColumns: string[] = ['no','List',  'Quantity', 'Remark','Date','status','action','action1','action2'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;


constructor(
  private formBuilder:FormBuilder,
  private ApiService: ApiService,
  private StorageService: StorageService,
  private Router:Router,
  private toastr:ToastrService,
  private modalService: BsModalService
 
  ) {
 
}


ngOnInit(): void{
  this.Get_itemorder();
  this.currentUser = this.StorageService.getUser();

}

 logout(): void {
  this.StorageService.signOut();
  this.Router.navigate(['/login']);
}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}

 
Get_itemorder(){
  let data = {
    mod: 'Get_itemorder',  
    Employee_ID:this.StorageService.getUser().Employee_ID,
    
  };
  this.ApiService.read(data).subscribe(resposne => {
   // console.log(resposne);
 
   this.List = resposne;
   this.dataSource = new MatTableDataSource(this.List);   
   this.dataSource.paginator = this.paginator; 
 

  });

  }

  Updateorder(No_ID:number,Status:string){
    console.log(No_ID,Status);
    if(Status =='อนุมัติการขอ'){
     
      this.toastr.error('อนุมัติแล้ว ไม่สามารถแก้ไขได้');
    }
    else if (Status =='แจ้งยกเลิกรายการ') {
      this.toastr.error('แจ้งยกเลิก ไม่สามารถแก้ไขได้');
    } else if (Status =='อนุมัติการส่งมอบ'){
      this.toastr.error('อนุมัติส่งมอบแล้ว ไม่สามารถแก้ไขได้');
    } else if(Status =='ยกเลิกการขอ'){
      this.toastr.error('รายการนี้ถูกยกเลิกแล้ว');
    } else {
      this.Router.navigate(['/updateorder',No_ID]); 
    }
  }

  Cancelorder(No_ID:number,Status:string){
    console.log(No_ID);
    if(Status =='ยกเลิกการขอ'){
      this.toastr.error('รายการนี้ถูกยกเลิกแล้ว');
    } else {
      this.Router.navigate(['/Cancel',No_ID]);
    }
    //  this.Router.navigate(['/Cancel',No_ID]);
    
      
  }

  Deleteorder(No_ID:number,Status:string){
  console.log(No_ID,Status);

   let data =  {
      mod: 'Get_Deleteorder',
      data: No_ID
      
    }; 

      if(Status =='อนุมัติการขอ'){
      
        this.toastr.error('ผ่านการอนุมัติแล้ว ไม่สามารถทำการลบได้');
      }else if(Status =='อนุมัติการส่งมอบ'){
        this.toastr.error('ผ่านการอนุมัติแล้ว ไม่สามารถทำการลบได้');
      }
      else{    
        this.ApiService.delete(data).subscribe(data =>{
        console.log(data);
        this.dataSource.data.splice(data,1);
        this.dataSource._updateChangeSubscription();
        this.toastr.info('ลบรายการสำเร็จ');
      
        
     
    //  this.dataSource.data.splice(data,1);
    //  this.dataSource._updateChangeSubscription();
    //  this.toastr.info('ลบรายการสำเร็จ');
    
     
    });
  }


  }
}