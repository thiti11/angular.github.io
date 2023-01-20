import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';

import { AuthenticationService } from '../_services';

export interface User {
  name: string;
  
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  myControl = new FormControl();
  constructor(
    private http:HttpClient, 
    private formBuilder: FormBuilder,
    private router:Router,
    private AuthenticationService:AuthenticationService

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
    );}


  Department: User[] = [{name: 'Quality Assurance'},
   {name: 'Production'}, 
   {name: 'Engineering'}, 
   {name: 'Human Resources'}, 
   {name: 'Finance&Accounting'}, 
   {name: 'Management'}, 
   {name: 'Supply Chain Management'}, 
   {name: 'Facility&Maintenance'}, 
   {name: '>Purchase'}];
  filteredDepartment: Observable<User[]> | undefined;
  Section: User[] = [
   {name: 'IPQA/B'}, {name: 'IPQA/A'}, {name: 'QA-MRB 3.5/A'}, {name: 'CMM/B'}, 
   {name: 'CQE'}, {name: 'Document/B'}, {name: 'CMM/A'}, {name: 'QA-MRB 2.5/B'}, 
   {name: 'Document/A'}, {name: 'Contamination Control/A'}, {name: 'QA-MRB 2.5/A'}, {name: 'OQA/A'}, 
   {name: 'IQA/A'}, {name: 'OQA/B'}, {name: 'SPC/A'}, {name: 'Calibation/A'}, 
   {name: 'Contamination Control/B'}, {name: 'IQA/B'}, {name: 'QA-MRB 3.5/B'}, {name: 'SPC/B'}, 
   {name: 'MC-Seagate/A'}, {name: 'MC-Seagate/B'}, {name: 'Incoming sort/A'}, {name: 'VMI-DSP/B'}, 
   {name: 'VMI-Seagate/B'}, {name: 'VMI-Seagate/A'}, {name: 'Sorting/A'}, {name: 'Sorting/B'}, 
   {name: 'Washing 3.5/B'}, {name: 'Incoming sort/B'}, {name: 'Washing 3.5/A'}, {name: 'VMI-DSP/A'}, 
   {name: 'Trainning/B'}, {name: 'Trainning/A'}, {name: 'Washing 2.5/A'}, {name: 'Process Engineering/B'}, 
   {name: 'Process Engineering/A'}, {name: 'Automation/A'}, {name: 'Automation/B'}, {name: 'Admin/B'}, 
   {name: 'HRM/A'}, {name: 'HRD/A'}, {name: 'Admin/A'}, {name: 'Accounting/A'}, 
   {name: 'Payroll'}, {name: 'IT'}, {name: 'SHE'}, {name: 'Management'}, {name: 'Warehouse/B'}, {name: 'Warehouse/A'}, {name: 'CS'}, {name: 'Material Planning/A'}, 
   {name: 'Maintenance/B'}, {name: 'Washing/A'}, {name: 'Washing/B'}, {name: 'Maintenance/A'}, 
   {name: 'Facility/A'}, {name: 'Purchase'}, 
   
  ];
  filteredSection: Observable<User[]> | undefined;

  Type_of_Employee: User[] = [
  {name: 'รายวัน'},
  {name: 'รายเดือน'}];
 filteredType_of_Employee: Observable<User[]> | undefined;

 Employee_Detail: User[] = [
 {name: 'พนักงานใหม่'},
 {name: 'พนักงานประจำ'}, 
 {name: 'พนักงานSub'}];
filteredEmployee_Detail: Observable<User[]> | undefined;
  
  

  ngOnInit(): void {
    this. filteredDepartment = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.Department.slice())),
    );
    this.filteredSection = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.Section.slice())),
    );
    this.filteredType_of_Employee = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.Type_of_Employee.slice())),
    );
    this.filteredEmployee_Detail = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.Employee_Detail.slice())),
    );

  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    
    return (this.Department.filter(option => option.name.toLowerCase().includes(filterValue)),
    
     this.Section.filter(option => option.name.toLowerCase().includes(filterValue)),
     this.Type_of_Employee.filter(option => option.name.toLowerCase().includes(filterValue)),
     this.Employee_Detail.filter(option => option.name.toLowerCase().includes(filterValue)));
   
  }
  
  onSubmit() {
  

 
  }
  

}
