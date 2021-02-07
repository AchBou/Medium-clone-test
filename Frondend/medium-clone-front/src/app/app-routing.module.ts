import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthSpaceComponent} from './components/auth-space/auth-space.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './services/auth-guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: AuthSpaceComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
