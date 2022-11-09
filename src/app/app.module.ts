import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { BotaoComponent } from './botao/botao.component';
import { SwService } from './swservice.service';

@NgModule({
  declarations: [
    AppComponent,
    BotaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [SwService],
  bootstrap: [AppComponent]
})
export class AppModule { }
