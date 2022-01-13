import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RANGES } from 'src/app/logic/global_constants';
import { MOCK_APPSTATE } from 'src/app/logic/mock_appstate';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartComponent ]
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
