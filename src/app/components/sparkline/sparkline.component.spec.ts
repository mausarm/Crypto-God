import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RANGES } from 'src/app/logic/global_constants';
import { MOCK_APPSTATE } from 'src/app/logic/mock_appstate';

import { SparklineComponent } from './sparkline.component';

describe('SparklineComponent', () => {
  let component: SparklineComponent;
  let fixture: ComponentFixture<SparklineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparklineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SparklineComponent);
    component = fixture.componentInstance;
    component.asset = MOCK_APPSTATE.assets[2];
    component.range = RANGES.all;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
