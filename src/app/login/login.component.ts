import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
    private route: Router){
      sessionStorage.clear();
    }

    users: any;

    loginform = this.builder.group({
      id: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required)
    })

    proceedlogin(){
      if(this.loginform.valid){
        this.service.getSingleData(this.loginform.value.id).subscribe(res => {
          this.users = res;
          console.log(this.users);
          if(this.users.password === this.loginform.value.password){
            if(this.users.isactive){
              this.toastr.success("Successfully logged in");
              this.route.navigate(['']);
              sessionStorage.setItem('id',this.users.id);
              sessionStorage.setItem('role',this.users.role);
            }else{
              this.toastr.error("Account is not active");
            }
          }else{
            this.toastr.error("Username or Password incorrect");
        }
        });
      }else{
        this.toastr.error("Please enter valid data");
      }
    }
}
