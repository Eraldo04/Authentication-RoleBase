import { AuthGuard } from './guard/auth.guard';
import { UserlistComponent } from './userlist/userlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component:HomeComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserlistComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
