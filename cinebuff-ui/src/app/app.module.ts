import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { TheatreComponent } from './theatre/theatre.component';
import {Router, RouterModule, Routes} from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { EditorpageComponent } from './editorpage/editorpage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'movie',
    component: MovieComponent
  },
  {
    path: 'moviedetails/:id',
    component: MoviedetailsComponent
  },
  {
    path: 'theatre',
    component: TheatreComponent
  },
  {
    path: 'connect',
    component: ConnectComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'edit',
    component: EditorpageComponent
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: HomeComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    MovieComponent,
    TheatreComponent,
    ConnectComponent,
    RegisterComponent,
    MoviedetailsComponent,
    EditorpageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
