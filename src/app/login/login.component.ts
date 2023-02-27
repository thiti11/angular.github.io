import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.sercice';
import {  Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm : any = {
    Username: null,
    Password: null
  };


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ApiService:ApiService,
    private StorageService:StorageService,
    private toastr:ToastrService,
     
) {  }
    

  ngOnInit(): void {
   //this.Get_login();
    this.loginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
  });


  
  }

  Get_login(){
    //console.log(this.loginForm.value);

    let data =  {
      mod: 'Get_login',  
      Username: this.loginForm.value.Username,
      Password: this.loginForm.value.Password,
    }; 
    this.ApiService.read(data)
  
    .subscribe({
      next: data => {
      console.log(data);
      if(data != null){
        
              //this.StorageService.saveToken(data.accessToken);
              this.StorageService.saveUser(data);
              if(data.Role=="Admin"){
                this.toastr.info('Admin เข้าสู่ระบบสำเร็จ');
                this.router.navigate(['/Admin']);
              }else{
               // console.log("failed")
               this.toastr.info('User เข้าสู่ระบบสำเร็จ');
                this.router.navigate(['/order']);
              }
        
              
      }else{
       //alert ('กรูณาตรวจสอบ Username and Password');
       this.toastr.error('กรูณาตรวจสอบ Username and Password');
       
       
      
      }

    },  
    });
  }

  
}

