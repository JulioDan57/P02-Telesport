import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailsComponent } from './pages/details/details.component';
import { LabelAndTextComponent } from './components/label-and-text/label-and-text.component';
import { HeaderTextComponent } from './components/header-text/header-text.component';
import { LineChartComponent} from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { CommonModule, LowerCasePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailsComponent, LabelAndTextComponent, HeaderTextComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, LineChartComponent, PieChartComponent, CommonModule],
  providers: [LowerCasePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
