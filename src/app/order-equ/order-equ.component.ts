import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-order-equ',
  templateUrl: './order-equ.component.html',
  styleUrls: ['./order-equ.component.css']
})
export class OrderEquComponent implements OnInit {
  currentUser: any;
  
  Username: any 
  Password: any
  Firstname: any 
  Lastname: any 
  EmpNo: any
  Position: any
  Department: any
  Section: any 
  Type_of_Employee: any 
  Employee_Detail: any
  Joined_date: any
  item: any
  
  constructor(
    private  StorageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.StorageService.getUser();
  }

}
