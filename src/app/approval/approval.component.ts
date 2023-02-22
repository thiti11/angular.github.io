import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.sercice';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  currentUser: any;

    
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

  ngOnInit(): void {
    this.Get_approval();
    this.currentUser = this.StorageService.getUser();
  }


  
 logout(): void {
  this.StorageService.signOut();
  this.Router.navigate(['/login']);
}

  Get_approval(){
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

}
