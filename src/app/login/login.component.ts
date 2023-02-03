
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services';
import { ApiService } from '../api.sercice';
import { User } from '../_models';
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
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
 
  
  constructor(private formBuilder:FormBuilder,
    private AuthenticationService:AuthenticationService,
    private router:Router,
    private ApiService:ApiService,
    private StorageService:StorageService  
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
    //onsole.log(this.loginForm.value);

    let data =  {
      mod: 'Get_login',  
      Username: this.loginForm.value.Username,
      Password: this.loginForm.value.Password,
    }; 
    this.ApiService.read(data)
    .pipe(first())
    .subscribe({
      next: data => {
      console.log(data);
      
        this.StorageService.saveToken(data.accessToken);
        this.StorageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
   
        //const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl :'/Order';
       this.router.navigate(['/order']);
      

    },  
     error: err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }
  });
    }
    
   
}

