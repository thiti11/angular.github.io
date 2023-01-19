import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

 /*  public hostname = window.location.hostname ;  */ 

 public hostname = 'localhost:8080' ; 
   PHP_API_SERVER = "http://"+this.hostname+"/TEST_API/server.php";

   
  read(data:any){
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}`,data);
  }
  insert(data: any): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}`,data);
  }
  delete(data: any) {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}`,data);
  }
  update(data: Array<any>) {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}`, data);
  }
  

}
