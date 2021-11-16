import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { AlertController, IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { from } from 'rxjs';
import { ApiService } from '../api.service';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1Page } from './tab1.page';
import { MockAlertController } from '../../../ionic-mocks';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApiServiceStub = {
  addJob: () => null,
  getJobs: () => [],
  fetchUsers: () => from([[
    { name: 'name1' },
    { name: 'name2' }
  ]]),
  fetchUsersByPromise: () =>
    Promise.resolve([
      { name: 'name1' },
      { name: 'name2' }
    ]),
  // fetchUsersByPromise: () => new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve([{ name: 'name1' }, { name: 'name2' }, { name: 'name3' }]);
  //     }, 4000);
  //   })
};

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let apiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      providers: [{ provide: ApiService, useValue: ApiServiceStub }, { AlertController, useValue: new MockAlertController() }]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    // fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Alert Hanhle should create', () => {
    component.okHandle();
    expect(component.okHandle).toBeDefined();
  });

  it('jobs should be an array', () => {
    expect(component.jobs.length).toBeDefined();
  });

  it('should login if valid', () => {
    expect(component.login('', '')).toBe('Username cannot be blank');
    expect(component.login('test', '')).toBe('Password cannot be blank');
    expect(component.login('a@b.com', 'test')).toBe('Invalid Password');
    expect(component.login('a@b.com', 'pass')).toBe('Success');
  });

  it('should add two numbers', () => {
    expect(component.add(1, 2)).toBe(3);
    expect(component.add('1', 2)).toBe('12');
  });

  // it('addJob should have called', () => {
  //   const job = 'Dummy Job';
  //   component.addJob(job);
  //   // expect(component.jobs.length).toBeGreaterThan(0);
  //   expect(component.jobs).toContain(job);
  // });

  it('addJob should add the job string to jobs array', () => {
    const job = 'Dummy Job';
    // spyOn(apiService, 'addJob');
    // spyOn(apiService, 'getJobs').and.returnValue([job]);

    // component.addJob(job);
    // expect(component.jobs.length).toBeGreaterThan(0);
    // expect(component.jobs).toContain(job);

    const jobs = [];
    spyOn(apiService, 'addJob').and.callFake((jb) => {
      jobs.push(jb);
    });
    spyOn(apiService, 'getJobs').and.returnValue([jobs]);
    component.addJob(job);
    expect(jobs.length).toBeGreaterThan(0);
    expect(jobs).toContain(job);
  });


  it('addJob should have called the apiService addJob function', () => {
    const job = 'Dummy Job';
    spyOn(apiService, 'addJob');
    component.addJob(job);
    expect(apiService.addJob).toHaveBeenCalled();
    expect(apiService.addJob).toHaveBeenCalledWith(job);
  });

  it('fetchUsers should return Observable which contains array of Jobs', () => {
    fixture.detectChanges();
    component.usersList.subscribe((result) => {
      expect(result.length).toBeDefined();
      expect(result[0].name).toBeDefined();
    });
  });

  it('fetchUsersByPromise should be array1 of Jobs', () => {
    fixture.detectChanges();
    expect(component.usersListByPromise.length).toBeDefined();
    expect(component.usersListByPromise[0].name).toBeDefined();
    expect(component.usersListByPromise[0].name).toEqual('name1');
  });

  it('fetchUsersByPromise should be array of Jobs', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.usersListByPromise.length).toBeDefined();
      expect(component.usersListByPromise[0].name).toBeDefined();
    });
  }));

  it('fetchUsersPromise should be array of Jobs (Using Fake Async)', fakeAsync(() => {
    fixture.detectChanges();
    tick(1000);
    expect(component.usersListByPromise.length).toBeDefined();
    expect(component.usersListByPromise[0].name).toBeDefined();
  }));

  it('should be able to trigger popup on click', async () => {
    const de: DebugElement = fixture.debugElement;
    const alertBtn = de.query(By.css('.alert-test')).nativeElement as HTMLIonButtonElement;
    alertBtn.click();
    await fixture.whenStable();
    expect(component.onClick).toBeTruthy();
  });

  it('should be able to trigger popup', fakeAsync(() => {
    component.onClick();
    tick(1000);
    const mockAlertController = component.alertController as any as MockAlertController;
    expect(mockAlertController.create).toBeTruthy();
    // expect(mockAlertController.getLast().present).toBe('');
  }));
});
