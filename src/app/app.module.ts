import { isDevMode, NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { SophiaComponent } from './sophia/sophia.component';
import { HoracertaComponent } from './horacerta/horacerta.component';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', component: StarComponent },
  { path: 'person', component: Component1Component },
  { path: 'dois/:variavel', component: Component2Component },
  { path: 'dificil', component: SophiaComponent },
  { path: 'hora', component: HoracertaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    BotaoComponent,
    Component1Component,
    Component2Component,
    StarComponent,
    SophiaComponent,
    HoracertaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    StoreModule.forFeature('app', AppReducer),
    EffectsModule.forRoot([SWEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    SwService,
    { provide: HTTP_INTERCEPTORS, useClass: XwingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
