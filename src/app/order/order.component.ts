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
  list: any;
 

constructor(private ApiService: ApiService,
  private  StorageService: StorageService) {
  
}

ngOnInit(): void{
   this.Get_itemorder();
  this.currentUser = this.StorageService.getUser();
  
}

 
Get_itemorder(){
  let data = {
    mod: 'Get_itemorder',  
  };
  this.ApiService.read(data).subscribe((resposne: any) => {
    console.log(resposne);
   
   this.list = resposne[1]['list'];
     
      
  });

  }

}
//this.Detall= resposne[4]['Detall'];