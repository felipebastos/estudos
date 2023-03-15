import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BotaoComponent } from './botao/botao.component';
import { SwService } from './star/swservice.service';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { StarComponent } from './star/star.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppReducer } from './store/app.reducer';
import { SWEffects } from './store/swstore/swstore.effects';
import { swreducer } from './store/swstore/swstore.reducer';
import { XwingInterceptor } from './star/xwing.interceptor';

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
    StoreModule.forRoot({}),
    StoreModule.forFeature('app', AppReducer),
    EffectsModule.forRoot([SWEffects]),
  ],
  providers: [
    SwService,
    { provide: HTTP_INTERCEPTORS, useClass: XwingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
