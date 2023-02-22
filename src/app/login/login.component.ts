
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services';
import { ApiService } from '../api.sercice';
import { Route, Router } from '@angular/router';
import { first } from 'rxjs';
import { StorageService } from '../_services/storage.service';







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
    private AuthenticationService:AuthenticationService,
    private router:Router,
    private ApiService:ApiService,
    private StorageService:StorageService,
     
) { 
  
    
    
  }
    

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
                this.router.navigate(['/Admin']);
              }else{
               // console.log("failed")
                
                this.router.navigate(['/order']);
              }
              //const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl :'/Order';
            //   this.router.navigate(['/order']);
              
               //alert("Login Success");
              
      }else{
        alert ('Login Failed');
       
      
      }

    },  
    });
  }

  
}

