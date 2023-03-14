import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.sercice';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-equ',
  templateUrl: './order-equ.component.html',
  styleUrls: ['./order-equ.component.css']
})
export class OrderEquComponent implements OnInit {
  currentUser: any;
  currentUser1: any;
  item: any
 // Status_ID:any;
  
  formoorderequ: any ={
    list:null,
    Quantity:null,
    Remark:null,
    Request_By:null,
    Status:null,
  }

  
  constructor(
    private formBuilder:FormBuilder,
    private  StorageService: StorageService,
    private Router:Router,
    private toastr:ToastrService,
    private ApiService:ApiService) { 
      this.formoorderequ = this.formBuilder.group({
        list: ['', Validators.required],
        Quantity: ['', Validators.required],
        Remark: ['', Validators.required],
        Request_By: this.currentUser = this.StorageService.getUser().Firstname, 
        Status: ['รอการอนุมัติ', Validators.required],
    
       
        
        
    });
    }

  ngOnInit(): void {
    this.currentUser = this.StorageService.getUser();
    this.currentUser1 = this.StorageService.getUser();
    this.Get_itemm() ;
    // this. Get_status();
    //console.log(this.status);
  }

  logout(): void {
    this.StorageService.signOut();
    this.Router.navigate(['/login']);
  }


  Get_Orderequ(){
    console.log(this.formoorderequ.value)
      let data = {
        mod: 'Get_Order', 
        
        list: this.formoorderequ.value.list,
        Quantity: this.formoorderequ.value.Quantity,
        Remark: this.formoorderequ.value.Remark,
        Request_By: this.currentUser = this.StorageService.getUser().Firstname, 
        Status: this.formoorderequ.value.Status,
        Employee_ID: this.currentUser = this.StorageService.getUser().Employee_ID, 
        Firstname: this.currentUser = this.StorageService.getUser().Firstname, 
    
       
        

      };
      if(this.formoorderequ.valid){
        this.ApiService.read(data).subscribe(data =>{
          console.log(data);
     
          this.toastr.info('ทำการสั่งซื้อสำเร็จ');
          this.Router.navigate(['/order']);
        
       
            
        });
       }else{
      
      //      alert('กรุณากรอกข้อมูลให้เรียบร้อยด้วยครับ');
            this.toastr.error('กรุณากรอกข้อมูลให้เรียบร้อยด้วยครับ');
    
       }
      }

      
    Get_itemm(){
 
      let data = {
        mod: 'Get_itemm',  
      };
      this.ApiService.read(data).subscribe((resposne: any) => {
        console.log(resposne);
       this.item = resposne
     //  this.List = resposne[this.List]['List'];
      
         
          
      });
    }
    Get_status(){
 
      let data = {
        mod: 'Get_status',  
      };
      this.ApiService.read(data).subscribe((resposne1: any) => {
        console.log(resposne1);
 //    this.status = resposne1[0]['Status']
     //  this.List = resposne[this.List]['List'];
   //  console.log(this.status);
      
         
          
      });
    }
  }