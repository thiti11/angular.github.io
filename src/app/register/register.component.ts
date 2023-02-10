import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';

import { ApiService } from '../api.sercice';

export interface User {
  name: string;
  
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: any = {
    Username:null,
    Password:null,
    Firstname:null,
    Lastname:null,
    EmpNo:null,
    Position:null,
    Department:null,
    Section:null,
    Type_of_Employee:null,
    Employee_Detail:null,
    Joined_date:null,
  };
  myControl = new FormControl();
 

  

  constructor(
    private http:HttpClient, 
    private formBuilder: FormBuilder,
    private router:Router,
    private ApiService:ApiService , 

    ) {  this.formRegister = this.formBuilder.group({
      Username:['', Validators.required],
      Password:['', Validators.required] ,
      Firstname:['', Validators.required],
      Lastname:['', Validators.required] ,
      EmpNo:['', Validators.required] ,
      Position:['', Validators.required] ,
      Department:['', Validators.required] ,
      Section:['', Validators.required],
      Type_of_Employee:['', Validators.required] ,
      Employee_Detail:['', Validators.required], 
      Joined_date:['', Validators.required] ,
    }
    );
  }


  ngOnInit(): void {
    
    //this.Get_Register();

  }

 


  Get_Register() {
  console.log(this.formRegister.value);
  let data = {
    mod: 'Get_Register', 
    Username: this.formRegister.value.Username,
    Password: this.formRegister.value.Password,
    Firstname: this.formRegister.value.Firstname,
    Lastname: this.formRegister.value.Lastname,
    EmpNo: this.formRegister.value. EmpNo,
    Position: this.formRegister.value.Position,
    Department: this.formRegister.value. Department,
    Section: this.formRegister.value.Section, 
    Type_of_Employee: this.formRegister.value.Type_of_Employee, 
    Employee_Detail: this.formRegister.value. Employee_Detail, 
    Joined_date: this.formRegister.value.Joined_date, 
  };
  this.ApiService.read(data).subscribe(data=> {
    console.log(data);
    //this.router.navigate(['login']);
    
      
  });
  
 
  }
  

}
