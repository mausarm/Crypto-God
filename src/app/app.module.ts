import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { assetReducer, uiStateReducer, offerStateReducer } from './store/reducer'; 
import { Effects } from 'src/app/store/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
 

import { ChartComponent } from './components/chart/chart.component';
import { HeaderComponent } from './components/header/header.component';
import { CryptoComponent } from './components/crypto/crypto.component';
import { MainComponent } from './components/main/main.component';
import { DataService } from './services/data.service';
import { SparklineComponent } from './components/sparkline/sparkline.component';
import { SettingsBarComponent } from './components/settings-bar/settings-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChoiceComponent } from './components/choice/choice.component';
import { QuestComponent } from './components/quest/quest.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    HeaderComponent,
    CryptoComponent,
    MainComponent,
    SparklineComponent,
    SettingsBarComponent,
    ChoiceComponent,
    QuestComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({assets: assetReducer, uiState: uiStateReducer, offerState: offerStateReducer}),
    EffectsModule.forRoot([Effects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    FormsModule,
    ChartsModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatIconModule,
    BrowserAnimationsModule,
    
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
