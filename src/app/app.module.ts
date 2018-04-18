import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { APP_ROUTES } from './app.routes';
import { PagesModule } from './pages/pages.module';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ViewObjectComponent } from './components/view-object/view-object.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PagenotfoundComponent, 
    ViewObjectComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
