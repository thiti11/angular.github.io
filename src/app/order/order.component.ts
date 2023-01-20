import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.sercice';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  
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

constructor(private ApiService: ApiService) {
  
}

ngOnInit(): void{
    this.Get_test();
}

Get_test(){

  let data = {
    mod: 'Get_test',  
  };
  this.ApiService.read(data).subscribe((resposne: any) => {
    this.item = resposne
  this.Username = resposne[0]['Username'];
     
      
  });
}
}
