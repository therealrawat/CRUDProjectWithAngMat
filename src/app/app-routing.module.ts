import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeadComponent } from './nav/head.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    component:HomeComponent,
    path:'home'
  },
  {
    component:HeadComponent,
    path:'head'
  },
  {
    path: 'update',
    component:UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
