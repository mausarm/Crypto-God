import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { NgChartsModule } from 'ng2-charts';
import { RANGES } from 'src/app/store/global_constants';
import { MOCK_APPSTATE } from 'src/app/store/mock_appstate';

import { SparklineComponent } from './sparkline.component';

describe('SparklineComponent', () => {
  let component: SparklineComponent;
  let fixture: ComponentFixture<SparklineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({})],
      declarations: [ SparklineComponent ],
      imports: [ BrowserAnimationsModule, NgChartsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SparklineComponent);
    component = fixture.componentInstance;
    component.assethistory = MOCK_APPSTATE.assets[2].history;
    component.range = RANGES.all;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
