import { APP_ROUTES } from './app.routes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagesModule } from './pages/pages.module';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProviderService } from './services/provider.service';
import { LoginComponent } from './login/login.component';





@NgModule({
  declarations: [
    AppComponent,    
    PagenotfoundComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    HttpClientModule,
    PagesModule
  ],
  providers: [ProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
