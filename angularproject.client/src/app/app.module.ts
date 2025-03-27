import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileandeditComponent } from './Amal/profileandedit/profileandedit.component';
import { HistoryComponent } from './Amal/history/history.component';





@NgModule({
  declarations: [
    AppComponent,
    ProfileandeditComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
