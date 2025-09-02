import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LabelAndTextComponent } from './label-and-text/label-and-text.component';
import { HeaderTextComponent } from './header-text/header-text.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, LabelAndTextComponent, HeaderTextComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
