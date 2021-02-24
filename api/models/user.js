var mongoose=require('mongoose'); 
  
var UserSchema = new mongoose.Schema({ 
    email: String,
    password: String,
    phone_number: String,
    first_name: String,
    last_name: String,
    gender: String,
    address: String,
    created_at: {
        type: Date,
        default: Date.now
      },
    otp:String,
    image:String
    
}); 
  
module.exports = mongoose.model( 
    'user', UserSchema, 'Users');