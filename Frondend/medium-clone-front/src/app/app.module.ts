import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CommentComponent } from './components/comment/comment.component';
import { SearchSectionComponent } from './components/search-section/search-section.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { SearchElementComponent } from './components/search-element/search-element.component';
import { AuthSpaceComponent } from './components/auth-space/auth-space.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { HomeComponent } from './components/home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    LoginComponent,
    SignupComponent,
    CommentComponent,
    SearchSectionComponent,
    SearchbarComponent,
    SearchElementComponent,
    AuthSpaceComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
