import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SettingsBarComponent } from './settings-bar.component';
import { RADIOCHECKED } from 'src/app/store/global_constants';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MOCK_APPSTATE } from 'src/app/store/mock_appstate';


describe('SettingsBarComponent', () => {
  let component: SettingsBarComponent;
  let fixture: ComponentFixture<SettingsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({})],
      declarations: [SettingsBarComponent],
      imports: [BrowserAnimationsModule, FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsBarComponent);
    component = fixture.componentInstance;
    component.quest = MOCK_APPSTATE.quest;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should contain "offer"', () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.debugElement.nativeElement;
    expect(element.textContent).toContain('offer');
  });

  it('should get OfferButtonState right', fakeAsync(() => {
    fixture.detectChanges();//muss innerhalb der fakeAsync Zone stehen wegen ngOnInit-timer
    component.radioChecked = RADIOCHECKED.offer;

    expect(component.getOfferButtonState())
      .withContext('highlighted if offer checked')
      .toBe('highlighted');

    component.radioChecked = RADIOCHECKED.all;
    component.newOfferAvailable = true;

    tick(0)

    expect(component.getOfferButtonState())
      .withContext('at start if offer available')
      .toBe('highlighted');

    tick(1000);

    expect(component.getOfferButtonState())
      .withContext('after 1s if offer available')
      .toBe('normal');

    component.ngOnDestroy();//timer unsubscribe in fakeAsync Zone

  }));

  it('should react to click button', () => {
    fixture.detectChanges();
    const element = fixture.debugElement;
    const radioButton: HTMLInputElement = element.query(By.css('#radioAll')).nativeElement;


    expect(radioButton.checked)
    .withContext('at start')
    .toBe(false);

    radioButton.click();

    expect(radioButton.checked)
    .withContext('after click')
    .toBe(true);

  });

});
