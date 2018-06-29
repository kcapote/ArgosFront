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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsgBoxComponent } from './components/msg-box/msg-box.component';
import { MsgBoxService } from './components/msg-box/msg-box.service';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './components/loader/loader.service';




@NgModule({
  declarations: [
    AppComponent,    
    PagenotfoundComponent,
    LoginComponent,
    MsgBoxComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    HttpClientModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProviderService, MsgBoxService, LoaderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
