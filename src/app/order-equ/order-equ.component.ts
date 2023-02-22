import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.sercice';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-order-equ',
  templateUrl: './order-equ.component.html',
  styleUrls: ['./order-equ.component.css']
})
export class OrderEquComponent implements OnInit {
  currentUser: any;
  item: any
  
  formoorderequ: any ={
    list:null,
    Quantity:null,
    Remark:null,
    Request_By:null,
  }

  
  constructor(
    private formBuilder:FormBuilder,
    private  StorageService: StorageService,
    private Router:Router,
    private ApiService:ApiService) { 
      this.formoorderequ = this.formBuilder.group({
        list: ['', Validators.required],
        Quantity: ['', Validators.required],
        Remark: ['', Validators.required],
        Request_By: ['', Validators.required],
        
        
    });
    }

  ngOnInit(): void {
    this.currentUser = this.StorageService.getUser();
    this.Get_itemm() ;
   
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
        Request_By: this.formoorderequ.value.Request_By,
        Employee_ID: this.currentUser = this.StorageService.getUser().Employee_ID, 
        Firstname: this.currentUser = this.StorageService.getUser().Firstname, 

      };
      this.ApiService.read(data).subscribe(data =>{
        console.log(data);
        this.Router.navigate(['/order']);
       // this.item = resposne
      //  this.Detall= resposne[4]['Detall'];

      });
  
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
  }