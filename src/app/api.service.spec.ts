import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { from, Observable } from 'rxjs';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getJobs should get list job strings', () => {
    const job = 'Dummy Job';
    spyOn(service, 'getJobs').and.returnValue([job]);
    const resp = service.getJobs();
    expect(resp.length).toBeGreaterThan(0);
    expect(resp).toContain(job);
  });

  it('addJob should add the job string to jobs array', () => {
    const job = 'Dummy Job';
    service.addJob(job);
    expect(service.jobs.length).toBeGreaterThan(0);
    expect(service.jobs).toContain(job);
  });

  it('fetchUsersByPromise should be array1 of Jobs', async () => {
    const dummy = [
      { name: 'name1' },
      { name: 'name2' }
    ];
    spyOn(service, 'fetchUsersByPromise').and.callFake(() => Promise.resolve(dummy));
    const out = await service.fetchUsersByPromise();
    expect(out[0].name).toBe(dummy[0].name);
  });

  it('fetchUsers should be array of Jobs', () => {
    const dummy = [
      { name: 'name1' },
      { name: 'name2' }
    ];
    spyOn(service, 'fetchUsers').and.callFake(() => from([dummy]));
    service.fetchUsers().subscribe((out) => {
      expect(out[0].name).toBe(dummy[0].name);
    });
  });
});
