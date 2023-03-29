import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
      private route: Router){}

    registerForm = this.builder.group({
      id: this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
      name: this.builder.control('',Validators.required),
      password: this.builder.control('',Validators.compose([Validators.required,Validators.minLength(6)])),
      email: this.builder.control('',Validators.compose([Validators.required, Validators.email])),
      gender: this.builder.control('male'),
      role: this.builder.control(''),
      isactive: this.builder.control(false)
    });

    proceedRegistration(){
      if(this.registerForm.valid){
          this.service.registerUser(this.registerForm.value).subscribe(res => {
            this.toastr.success('Please wait for the access','Successfully Registered');
            console.log(res)
            this.route.navigate(['login']);
          })
      }else{
          this.toastr.warning("Please enter a valid data");
      }
    }
}
