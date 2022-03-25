import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MainComponent } from './main.component';
import { MOCK_APPSTATE } from 'src/app/store/mock_appstate';
import { HeaderComponent } from '../header/header.component';
import { ChartComponent } from '../chart/chart.component';
import { CryptoComponent } from '../crypto/crypto.component';
import { SparklineComponent } from '../sparkline/sparkline.component';
import { SettingsBarComponent } from '../settings-bar/settings-bar.component';
import { ChoiceComponent } from '../choice/choice.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: MOCK_APPSTATE })],
      declarations: [
        MainComponent,
        ChartComponent,
        CryptoComponent,
        SparklineComponent,
        SettingsBarComponent,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        NgChartsModule,
        DragDropModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
