import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.sercice';

@Component({
  selector: 'app-order-equ',
  templateUrl: './order-equ.component.html',
  styleUrls: ['./order-equ.component.css']
})
export class OrderEquComponent implements OnInit {
  currentUser: any;
  item: any
  List: any
 // Date: any
  //Update_date :any
  formoorderequ: any ={
    list:null,
    Quantity:null,
    Remark:null,
    Hat:null
  }

  
  constructor(
    private formBuilder:FormBuilder,
    private  StorageService: StorageService,
    private ApiService:ApiService) { 
      this.formoorderequ = this.formBuilder.group({
        list: ['', Validators.required],
        Quantity: ['', Validators.required],
        Remark: ['', Validators.required],
        Hat: ['', Validators.required]
    });
    }

  ngOnInit(): void {
    this.currentUser = this.StorageService.getUser();
    this.Get_itemm() ;
   
  }
   
  Get_Orderequ(){
    console.log(this.formoorderequ.value)
      let data = {
        mod: 'Get_Order', 
        
        list: this.formoorderequ.value.list,
        Quantity: this.formoorderequ.value.Quantity,
        Remark: this.formoorderequ.value.Remark,
        Hat: this.formoorderequ.value.Hat,
        Employee_ID: this.currentUser = this.StorageService.getUser().Employee_ID, 


      };
      this.ApiService.read(data).subscribe(data =>{
        console.log(data);
        //this.router.navigate(['login']);
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
        this.List = resposne[0]['List'];
     //  this.List = resposne[this.List]['List'];
      
         
          
      });
    }
  }
