import { Component } from '@angular/core';
import { APIService } from '../api-service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-verify-phone',
  templateUrl: 'verify-phone.page.html',
  styleUrls: ['verify-phone.page.scss'],
})
export class VerifyPhonePage {

  phoneNumber = ""

  constructor(public apiService: APIService, private router: Router) {
  }
  async loadUser() {
    if (!this.phoneNumber ) {
      await this.apiService.presentToastWithOptions("All fields are mandatory.");
      return;
    }
    if (!/^\d{10}$/.test(this.phoneNumber)) {
      await this.apiService.presentToastWithOptions(
        "Phone number should be of 10 digits."
      );
      return;
    }
    await this.apiService.showLoading();

    let register = await this.apiService.postCall('user/generate-otp', {
      phone_number : this.phoneNumber,
    });
    console.log(register);
    await this.apiService.presentToastWithOptions("otp has been send on your phone.");
    this.gotoNext();
  }
  gotoNext(){  
    this.router.navigate(['/verify-otp']);
  }
  gotoback(){  
    this.router.navigate(['/sign-up']);  
  } 
}
