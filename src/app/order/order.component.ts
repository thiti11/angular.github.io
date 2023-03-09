import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.sercice';
import { StorageService } from '../_services/storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



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
  



 

  displayedColumns: string[] = ['no','List',  'Quantity', 'Remark','status','action','action1'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;


constructor(
  private formBuilder:FormBuilder,
  private ApiService: ApiService,
  private StorageService: StorageService,
  private Router:Router,
  private toastr:ToastrService,
 
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

  Updateorder(No_ID:number,Approved_By:string){
    console.log(No_ID,Approved_By);
    if(Approved_By !=''){
      
      this.toastr.info('อนุมัติแล้ว ไม่สามารถแก้ไขได้');
    }
    else{
      this.Router.navigate(['/updateorder',No_ID]);
    }
      
  }

  Deleteorder(No_ID:number){
  console.log(No_ID);


  
   let data =  {
      mod: 'Get_Deleteorder',
      data: No_ID
      
    }; 
    this.ApiService.delete(data).subscribe(data =>{
      console.log(data);
      
     
      this.dataSource.data.splice(data,1);
      this.dataSource._updateChangeSubscription();
      this.toastr.info('ลบรายการสำเร็จ');
    
     
    });


  }
}