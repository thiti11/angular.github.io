import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.sercice';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  currentUser: any;
  currentOrder: any;
  
  
 
   
  formoorderequ: any ={
    no:null,
    list:null,
    Quantity:null,
    Remark:null,
    Hat:null
  }
  

  constructor(    private formBuilder:FormBuilder,
    private  StorageService: StorageService,
    private ApiService:ApiService,
    private router:ActivatedRoute) { 
      this.formoorderequ = this.formBuilder.group({
        list: ['', Validators.required],
        Quantity: ['', Validators.required],
        Remark: ['', Validators.required],
        Hat: ['', Validators.required]
    }); }

  ngOnInit(): void {
    this.currentUser = this.StorageService.getUser();
  //  this.currentOrder = this.router.snapshot.params['No_ID']
    
   
   // this.Get_Updateorder();
  
  }
 

  Get_Updateorder(){
    console.log(this.formoorderequ.value)
    
    let data = {
      mod: 'Get_Updateorder', 
      data:this.router.snapshot.params['No_ID'],
       
      list: this.formoorderequ.value.list,
      Quantity: this.formoorderequ.value.Quantity,
      Remark: this.formoorderequ.value.Remark,
      Hat: this.formoorderequ.value.Hat,


    };
    this.ApiService.read(data).subscribe(data =>{
      console.log(data);
    

        
    });
    }

 
}