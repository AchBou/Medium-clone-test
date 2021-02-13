import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { HomeComponent } from './components/home/home.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ArticleDialogComponent} from './components/article/article-dialog/article.dialog';



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
    CommentSectionComponent,
    ArticleDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
