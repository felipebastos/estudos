import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BotaoComponent } from './botao/botao.component';
import { SwService } from './star/swservice.service';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { StarComponent } from './star/star.component';

const routes: Routes = [
  { path: '', component: StarComponent },
  { path: 'um', component: Component1Component },
  { path: 'dois', component: Component2Component },
];

@NgModule({
  declarations: [
    AppComponent,
    BotaoComponent,
    Component1Component,
    Component2Component,
    StarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [SwService],
  bootstrap: [AppComponent],
})
export class AppModule {}
