import { Router } from '@angular/router';
import { Component, DoCheck } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'angular14';
  ismenurequired = false;
  isadminuser = false;
  constructor(private route: Router,private service:AuthService){}



  ngDoCheck(): void {
    let currenturl = this.route.url;
    let role = sessionStorage.getItem('role');
    if(currenturl == '/login' || currenturl == '/register'){
      this.ismenurequired = false;
    }else{
      this.ismenurequired = true;
    }
    if(role === 'admin'){
      this.isadminuser = true;
    }else{
      this.isadminuser = false;
    }
  }
}
