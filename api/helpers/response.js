
const codes = [
    { "Code": "ACC001", "Text": "Wrong password" },
    { "Code": "ACC002", "Text": "Email not registered" },
    { "Code": "ACC003", "Text": "User already exist with this emailId" },
    { "Code": "ACC004", "Text": "Invalid number" },
    { "Code": "ACC005", "Text": "Wrong OTP" },
    { "Code": "ACC006", "Text": "User does not exist" },

    { "Code": "CEN001", "Text": "Center already exist" },
    { "Code": "CEN002", "Text": "Center does not exist" },
    { "Code": "BOK001", "Text": "Booking already exist" },
    { "Code": "BOK002", "Text": "Booking does not exist" },

];

environment = {};
module.exports = function () {
    //setting default value
    this.Code = "P00001";
    this.Message = "Success";
    this.Data = null;


    this.getSuccessOutOut = function () {
        return {
            Code: "P00001",
            Message: this.Message, // "Get message from repo";
            Data: this.Data
        }
    };

    this.getErrorOutOut = function (code) {
        return {
            Code: code,
            Message: this.getMessageByCode(code), // "Get message from repo";
            Data: null
        }
    };

    this.getMessageByCode = function (code) {
        var txt = "Unknown error code";
        for (var i = 0; i < codes.length; i++) {
            if (codes[i].Code == code) {
                txt = codes[i].Text
                break;
            }
        }

        return txt;
    };

    this.wrapResponse = function (data, errorCode) {
        var toReturn = null;
        if (errorCode) {
            toReturn = this.getErrorOutOut(errorCode);
            toReturn.Data = null;
        } else {
            toReturn = this.getSuccessOutOut();
            toReturn.Data = data;
        }
        return toReturn;
    }

    this.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    this.getEnvironmentVariable = function (name) {
        return environment[name]
    }

}