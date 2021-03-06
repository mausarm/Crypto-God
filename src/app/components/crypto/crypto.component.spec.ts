import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RANGES } from 'src/app/store/global_constants';
import { MOCK_APPSTATE } from 'src/app/store/mock_appstate';

import { CryptoComponent } from './crypto.component';
import { SparklineComponent } from '../sparkline/sparkline.component';
import { NgChartsModule } from 'ng2-charts';

describe('CryptoComponent', () => {
  let component: CryptoComponent;
  let fixture: ComponentFixture<CryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({})],
      declarations: [ CryptoComponent, SparklineComponent ],
      imports: [ BrowserAnimationsModule, NgChartsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoComponent);
    component = fixture.componentInstance;
    component.asset = MOCK_APPSTATE.assets[2];
    component.range = RANGES.all;
    component.isChosen = true;
    component.isAlert = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
