import { TestBed } from '@angular/core/testing';
import { MedicosServices } from './medicos';

describe('Medicos', () => {
  let service: MedicosServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicosServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
