import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './pages/layouts/layout.module';
import { RootStateModule } from './store';
import { MaterialModule } from './utils/materials/material.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MaterialModule,
    RootStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
