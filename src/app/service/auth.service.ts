import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
    api = 'http://localhost:3000/user';
    
    getData(){
      return this.http.get(this.api)
    }

    getRole(){
      return this.http.get("http://localhost:3000/role")
    }

    getSingleData(code: any){
      return this.http.get(this.api + '/' + code)
    }

    registerUser(inputData: any){
      return this.http.post(this.api,inputData)
    }

    updateUser(code:any, inputData: any){
      return this.http.put(this.api + '/' + code, inputData)
    }

    isLoggedIn(){
      return sessionStorage.getItem('id') != null;
    }
    getUserRole(){
      return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')?.toString(): '';
    }
}
