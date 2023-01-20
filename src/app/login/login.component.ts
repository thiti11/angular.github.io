
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthenticationService } from '../_services';
import { ApiService } from '../api.sercice';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
    loginForm!: FormGroup
    Username: any
    Password: any
 
 

  constructor(
 
    private formBuilder: FormBuilder,
    private AuthenticationService: AuthenticationService,
    private ApiService:ApiService  
  
    ){  }

    ngOnInit(){
      this.loginForm = this.formBuilder.group({
        Username: ["", Validators.required],
        Password: ["", Validators.required]
    });
    
   
  }
  Login() {
    console.log(this.loginForm.value);
    this.AuthenticationService.login(this.Username,this.Password)
    .subscribe(data =>{
      console.log(data);
      if(data.message =='success'){
        
      }
     
    },
    error => {
      alert("User name or password is incorrect")

    }
    )
   
  
    

    }


  
}
