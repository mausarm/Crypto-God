import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { MOCK_APPSTATE } from '../logic/mock_appstate';
import { INITIAL_ASSETS } from '../store/initial_state';
import { of } from 'rxjs';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and load state', (done) => {
    service.storeState(MOCK_APPSTATE);
    service.loadState().subscribe(loadedState => {
      expect(loadedState.assets).toEqual(MOCK_APPSTATE.assets);
      done();
    }
    );
  });

  it('should update assets', (done) => {
    spyOn<any>(service, "getAssetsFromAPI").and.returnValue(of(MOCK_APPSTATE.assets));
    spyOn<any>(service, "getSparklinesFromAPI").and.returnValue(of(MOCK_APPSTATE.assets));
    service.updateAssets(INITIAL_ASSETS).subscribe(result => {
      expect(result[2]).toEqual(MOCK_APPSTATE.assets[2]);
      done();
    }
    );
  });
});
