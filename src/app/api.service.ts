import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  jobs = [];
  constructor(private httpClient: HttpClient) { }

  getJobs() {
    return this.jobs;
  }

  addJob(job: string) {
    this.jobs.push(job);
  }

  fetchUsers() {
    return this.httpClient
      .get('https://jsonplaceholder.typicode.com/users');
  }

  fetchUsersByPromise() {
    return this.httpClient
      .get('https://jsonplaceholder.typicode.com/users')
      .toPromise();
  }
}
