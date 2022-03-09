import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChoiceComponent } from './components/choice/choice.component';
import { CryptoComponent } from './components/crypto/crypto.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { SettingsBarComponent } from './components/settings-bar/settings-bar.component';
import { SparklineComponent } from './components/sparkline/sparkline.component';
import { MOCK_APPSTATE } from './store/mock_appstate';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ChartComponent,
        HeaderComponent,
        CryptoComponent,
        MainComponent,
        SparklineComponent,
        SettingsBarComponent,
        ChoiceComponent,
      ],
      imports: [
        RouterTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ChartsModule,
        DragDropModule,
      ],
      providers: [provideMockStore({ initialState: MOCK_APPSTATE })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'CryptoGod'`, () => {
    expect(component.title).toEqual('CryptoGod');
  });

});
