import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddbookComponent } from './addbook/addbook.component';
import { UpdatebookComponent } from './updatebook/updatebook.component';
import { ProfileComponent } from './profile/profile.component';
import { CitatComponent } from './citat/citat.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'addbook', component:AddbookComponent},
  {path: 'updatebook', component:UpdatebookComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'citat', component:CitatComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
