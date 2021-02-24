import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadingController, toastController } from '@ionic/core';

@Injectable()
export class APIService {
  constructor(private http: HttpClient) { }

 // apiUrl = 'http://soccer-api.ithours.com/'
 apiUrl = 'http://localhost:4200/'
 
  async getCall(url) {
    try {
      const apidata = await this.http.get(`${this.apiUrl + url}`).toPromise();
      return { isError: false, apidata: apidata }
    } catch (error) {
      return { isError: true, error }
    }
  }

  async postCall(url, data) {
    try {
      const apidata = await this.http.post(`${this.apiUrl + url}`, data).toPromise();
      return { isError: false, apidata: apidata }
    } catch (error) {
      return { isError: true, error }
    }
  }

  async putCall(url, data) {
    try {
      const apidata = await this.http.put(`${this.apiUrl + url}`, data).toPromise();
      return { isError: false, apidata: apidata }
    } catch (error) {
      return { isError: true, error }
    }
  }

 showLoading = async () => {
 let loader = await loadingController.create({
    cssClass: "my-custom-class",
    message: "Please wait...",
    duration: 3000,
  });
  await loader.present();
}

presentToastWithOptions = async (_message: any) => {
  const toast = await toastController
    .create({
      message: _message,
      duration: 4000
    })
  return toast.present();
}

  
}