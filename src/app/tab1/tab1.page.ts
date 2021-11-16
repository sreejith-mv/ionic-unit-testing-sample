import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  jobs = [];
  usersList;
  usersListByPromise;
  // constructor() {
  constructor(private apiService: ApiService, public alertController: AlertController) {
    this.jobs = this.apiService.getJobs();
    this.usersList = this.apiService.fetchUsers();

    this.apiService.fetchUsersByPromise().then((users) => {
      this.usersListByPromise = users;
    });
  }

  addJob(job: string) {
    // this.jobs.push(job);
    this.apiService.addJob(job);
  }

  add(num1, num2) {
    return num1 + num2;
  }

  login(email, password) {
    if (email.length === 0) {
      return 'Username cannot be blank';
    } else if (password.length === 0) {
      return 'Password cannot be blank';
    } else if (email === 'a@b.com' && password === 'pass') {
      return 'Success';
    }
    else {
      return 'Invalid Password';
    }
  }

  async onClick() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Test case completed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: this.okHandle
        }, {
          text: 'Okay',
          // handler: () => {
          //   console.log('Confirm Okay');
          // }
        }
      ]
    });

    await alert.present();
  }


  okHandle() {
    console.log('Confirm Cancel: blah');
  };

}
