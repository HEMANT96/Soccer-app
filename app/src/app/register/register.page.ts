import { Component } from '@angular/core';
import { APIService } from '../api-service';
import { Router } from '@angular/router';  
import { Location } from '@angular/common'

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  phoneNumber = ""
  password = ""
  confirmPassword = ""      
  regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

  
  constructor(public apiService: APIService, private router:Router, private location: Location) {
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
    if (!this.password && !this.confirmPassword ) {
      await this.apiService.presentToastWithOptions("All fields are mandatory.");
      return;
    }
    if (!this.password) {
      await this.apiService.presentToastWithOptions("password is a mandatory field.");
      return;
    }
    if (this.password != this.confirmPassword) {
      await this.apiService.presentToastWithOptions(
        "Confirm password does not match with password."
      );
      return;
    }
    if (!this.confirmPassword) {
      await this.apiService.presentToastWithOptions("confirm password is a mandatory field.");
      return;
    }
    if (!this.regexPassword.test(this.password)) {
      await this.apiService.presentToastWithOptions(
        "Password should be of atleast 8 characters and should contain 1 special Character, 1 upper case, 1 lower case and 1 number."
      );
      return;
    }
    
    if (!this.regexPassword.test(this.confirmPassword)) {
      await this.apiService.presentToastWithOptions(
        "Confirm password should be of atleast 8 characters and should contain 1 special Character, 1 upper case, 1 lower case and 1 number."
      );
      return;
    }
   /*  if (!this.password) {
      await this.apiService.presentToastWithOptions("password is a mandatory field.");
      return;
    } */
    
   /*  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      await this.apiService.presentToastWithOptions(
      "email should be valid"
      );
      return;
    } */
    await this.apiService.showLoading();

    let register = await this.apiService.postCall('user/updatepassword',{
      phone_number : this.phoneNumber,
      password : this.password,
    });
    console.log(register);
    await this.apiService.presentToastWithOptions("password has been updated.");
    this.gotoNext();
  }
  
  gotoNext(){  
    this.router.navigate(['/home']);  
  }
  gotoBack(){
    this.location.back(); 
  }
  async toggleConfirmPassword() {
    const ps: any = document.getElementById("pwds");
    const imgs: any = document.getElementById("imgs");
    const srctype = ps.getAttribute("src");
    const typePwd = ps.getAttribute("type");
    if (typePwd == "text") {
      ps.setAttribute("type", "password");
    } else {
      ps.setAttribute("type", "text");
    }
  }
  async ConfirmPassword() {
    const ps: any = document.getElementById("pws");
    const imgs: any = document.getElementById("ims");
    const srctype = ps.getAttribute("src");
    const typePwd = ps.getAttribute("type");
    if (typePwd == "text") {
      ps.setAttribute("type", "password");
    } else {
      ps.setAttribute("type", "text");
    }
  }
}
