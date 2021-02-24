const axios = require('axios');

export default {
  install(Vue) {
    let app = new Vue({
      data() {
        return {
          // apiUrl: 'http://localhost:3000/'
          apiUrl: 'http://soccer-api.ithours.com/'
        };
      },
      methods: {
        async getCall(url) {
          try {
            const apidata = await axios.get(`${this.apiUrl + url}`);
            return { isError: false, apidata: apidata.data }
          } catch (error) {
            return { isError: true, error }
          }
        },
        async postCall(url, data) {
          try {
            const apidata = await axios.post(`${this.apiUrl + url}`, data);
            return { isError: false, apidata: apidata.data }
          } catch (error) {
            return { isError: true, error }
          }
        },
        async putCall(url, data) {
          try {
            const apidata = await axios.put(`${this.apiUrl + url}`, data);
            return { isError: false, apidata: apidata.data }
          } catch (error) {
            return { isError: true, error }
          }
        },
        async uploadImage(currentFile) {
          return new Promise((resolve, reject) => {


            //var self = this;
            let fileName = currentFile.name || (new Date().getTime().toString() + ".png");
            // let filetype = fileName.split(".")[1];
            let fileNameToSend = new Date().getTime() + fileName.substring(fileName.indexOf("."), fileName.length);
            let photoKey = "regrub/" + "123" + "/" + fileNameToSend;

            const albumBucketName = "dolphino";
            const bucketRegion = "us-west-2";
            const IdentityPoolId = "us-west-2:ff182092-2a76-489c-9d58-45ba742d9e7d";
            AWS.config.update({
              region: "us-west-2", //'us-west-2',
              credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: IdentityPoolId,
              }),
            });

            var awsS3SObj = new AWS.S3({
              apiVersion: "2012-10-17", //'2006-03-01',
              params: {
                Bucket: albumBucketName,
              },
            });
            awsS3SObj.upload(
              {
                Key: photoKey,
                Body: currentFile,
                ACL: "public-read",
              }, function (err, data) {
                if (err) {
                  alert("There was an error uploading your Image: ");
                  resolve(null);
                } else {
                  resolve(data.Location); // "https://i.picsum.photos/id/469/200/300.jpg?hmac=XkjIV9jof2hkk4eUpQpbQVMBiSTfqdlJxIdlcIdEM6Q")
                }
              });
          })
        },
        async notify(message) {
          this.$notify({
            message: message,
            //  'Welcome to <b>Vue Black Dashboard Pro</b> - a beautiful resource for every web developer',
            timeout: 3000,
            icon: 'tim-icons icon-bell-55',
            horizontalAlign: 'top',
            verticalAlign: 'center',
            type: 'info'
          });
        }
      }
    });

    Vue.prototype.$apiService = app;
  }
};
