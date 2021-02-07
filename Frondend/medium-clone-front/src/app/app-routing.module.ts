import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthSpaceComponent} from './components/auth-space/auth-space.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  { path: '', component: AuthSpaceComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
