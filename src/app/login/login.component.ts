
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.sercice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  formLogin: FormGroup;

  constructor(
 
    private formBuilder: FormBuilder,
    private ApiService: ApiService

    ){
      this.formLogin = this.formBuilder.group({
        Username:['', [Validators.required]],
        Password:['', Validators.required] 
      });
    

    }


  ngOnInit(): void {
  }

  login(){
    let data ={
      mod: ' login',
    };
    this.ApiService.read(data).subscribe()
  }
  
  
}
