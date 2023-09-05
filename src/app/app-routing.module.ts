import { AddUpdateComponent } from './add-update/add-update.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},  
  {path:'home',title: `Employee's List` ,component: HomeComponent},
  {path:'add',title: 'Add Employee',component: AddUpdateComponent},
  {path:'update/:id',title:'Update Employee',component: AddUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
