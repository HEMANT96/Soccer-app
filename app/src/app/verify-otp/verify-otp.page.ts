import { Component } from '@angular/core';
import { APIService } from '../api-service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-verify-otp',
  templateUrl: 'verify-otp.page.html',
  styleUrls: ['verify-otp.page.scss'],
})
export class VerifyOtpPage {

    phoneNumber = ""
    otp1 = ""
    otp2 = ""
    otp3 = ""
    otp4 = ""
   

    constructor(public apiService: APIService, private router: Router) 
    {
       this.getPhone(); 
      
      }

    async getPhone(){
      let userId = window.localStorage.getItem("USERID");

      let phone = await this.apiService.getCall('user/userbyId/' + userId)
      console.log(phone)

      let apidata: any = phone.apidata;
       console.log(apidata.Data.phone_number)
       this.phoneNumber = apidata.Data.phone_number;
    }
    async loadUser() {
      if (!this.otp1 && !this.otp2 && !this.otp3 && !this.otp4 ) {
        await this.apiService.presentToastWithOptions(
          "please enter valid OTP."
          );
        return;
      }
      if (!this.otp1) {
        await this.apiService.presentToastWithOptions(
          "please enter valid OTP."
        );
        return;
      }
      if (!this.otp2) {
        await this.apiService.presentToastWithOptions(
          "please enter valid OTP."
        );
        return;
      }
      if (!this.otp3) {
        await this.apiService.presentToastWithOptions(
          "please enter valid OTP."
        );
        return;
      }
      if (!this.otp4) {
        await this.apiService.presentToastWithOptions(
          "please enter Valid OTP."
        );
        return;
      }

      await this.apiService.showLoading();
   
      const Otp = this.otp1 + this.otp2 + this.otp3 + this.otp4;
      let register = await this.apiService.postCall('user/verify-otp', {
        phone_number : this.phoneNumber,
        otp : Otp
      });
      let apidata: any = register.apidata;
      console.log(Otp);
      console.log(register);
      console.log(apidata.Message)
      if(apidata.Message != "Success"){
        await this.apiService.presentToastWithOptions(
          apidata.Data.Message 
        );
      }
      else{
        await this.apiService.presentToastWithOptions("otp has been verified.");
        this.gotoNext();
      }
    }
    gotoNext(){  
      this.router.navigate(['/register']);
    }
    gotoback(){  
      this.router.navigate(['/verify-phone']);  
    } 
  }
