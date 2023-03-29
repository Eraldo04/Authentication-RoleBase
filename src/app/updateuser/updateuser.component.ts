import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit{

  constructor(private builder: FormBuilder, private service:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any, private toastr: ToastrService,
    private dialog: MatDialogRef<UpdateuserComponent>){}


    editdata:any;

  ngOnInit(): void {
    this.service.getRole()?.subscribe(res => {
      this.rolelist = res;
    })
    if(this.data.usercode != null && this.data.usercode != ''){
      this.service.getSingleData(this.data.usercode).subscribe(res => {
        this.editdata = res;
        this.registerForm.setValue({
          id: this.editdata.id, name: this.editdata.name, role: this.editdata,
          email: this.editdata.email, password: this.editdata.password, gender: this.editdata.gender,
          isactive: this.editdata.isactive})
      });
    }
  }

  rolelist: any;

  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });

  updateUser(){
    if(this.registerForm.valid){
      this.service.updateUser(this.registerForm.value.id, this.registerForm.value).subscribe(res => {
        this.toastr.success("Updated Successfully");
        this.dialog.close();
      })
    }else{
      this.toastr.warning("Unable, Please Select User")
    }
  }
}
