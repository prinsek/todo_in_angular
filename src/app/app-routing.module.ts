import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormComponent } from './Header/form/form.component';
import { LoginComponent } from './Header/login/login.component';
import { MainComponent } from './Header/main/main.component';



const routes: Routes = [
  {path: 'todo', component: MainComponent},
  {path: 'form', component: FormComponent},
  {path:'',component:LoginComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
constructor(private router:Router){
  if(sessionStorage.getItem('user')==null){
    this.router.navigate([''])
  }
}
}
