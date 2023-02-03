import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-order-equ',
  templateUrl: './order-equ.component.html',
  styleUrls: ['./order-equ.component.css']
})
export class OrderEquComponent implements OnInit {
  currentUser: any;
  

  
  constructor(
    private  StorageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.StorageService.getUser();
  }

}
