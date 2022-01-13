import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MainComponent } from './main.component';
import { MOCK_APPSTATE } from 'src/app/logic/mock_appstate';
import { HeaderComponent } from '../header/header.component';
import { ChartComponent } from '../chart/chart.component';
import { CryptoComponent } from '../crypto/crypto.component';
import { SparklineComponent } from '../sparkline/sparkline.component';
import { SettingsBarComponent } from '../settings-bar/settings-bar.component';
import { ChoiceComponent } from '../choice/choice.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: MOCK_APPSTATE })],
      declarations: [ 
        MainComponent,
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
