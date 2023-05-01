import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PageModule } from './pages/page.module';
import { RootStateModule } from './store';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PageModule,
    RootStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
