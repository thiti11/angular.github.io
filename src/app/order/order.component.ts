import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.sercice';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
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

constructor(private ApiService: ApiService,
  private  StorageService: StorageService) {
  
}

ngOnInit(): void{
  //  this.Get_item();
  this.currentUser = this.StorageService.getUser();
}


}
