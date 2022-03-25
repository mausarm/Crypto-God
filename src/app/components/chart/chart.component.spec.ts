import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgChartsModule } from 'ng2-charts';
import { RANGES } from 'src/app/store/global_constants';
import { MOCK_APPSTATE } from 'src/app/store/mock_appstate';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [ NgChartsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.asset = MOCK_APPSTATE.assets[2];
    component.range = RANGES.all;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
