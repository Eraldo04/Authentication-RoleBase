import { UpdateuserComponent } from './../updateuser/updateuser.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from './../service/auth.service';
import { Component, ViewChild } from '@angular/core';
import { MatSort }  from  '@angular/material/sort'

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  constructor(private service: AuthService, private dialog:MatDialog){
    this.LoadUser();
  }
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort)  sort !: MatSort;

  LoadUser(){
    this.service.getData().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  UpdateUser(code:any){
   const popup = this.dialog.open(UpdateuserComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: code
      }
    })
    popup.afterClosed().subscribe(res => {
      this.LoadUser();

    })
  }

  opendialog(){
  }


  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'action'];
}
