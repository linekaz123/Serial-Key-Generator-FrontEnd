import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SerialSetComponent } from './components/serial-set/serial-set.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SerialFormComponent } from './components/serial-form/serial-form.component';
import { SerialListComponent } from './components/serial-list/serial-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SerialSetComponent,
    SerialFormComponent,
    SerialListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
