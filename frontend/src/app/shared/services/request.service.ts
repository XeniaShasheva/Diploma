import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponseType } from 'src/types/default-response.type';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  sendRequests(name:string,phone:string,type:string,service?:string):Observable<DefaultResponseType>{
    return this.http.post<DefaultResponseType>('http://localhost:3000/api/'+'requests',{
      name,
      phone,
      service,
      type
    })
  }

}
