import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthSpaceComponent} from './pages/auth-space/auth-space.component';
import {HomeComponent} from './pages/home/home.component';
import {AuthGuard} from './services/guards/auth-guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: AuthSpaceComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'article/:articleId', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
