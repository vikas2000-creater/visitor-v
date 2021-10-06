const mongoose= require('mongoose'); 
const passportLocalMongoose= require('passport-local-mongoose');
const userSchema= new mongoose.Schema({
   
   email:{
   	type:String,
   	required:true,
   	trim:true
   },
   num:{
   	type:Number,
   	required:true,
   	trim:true,

   } 



})  
userSchema.plugin(passportLocalMongoose);
const User= mongoose.model('user',userSchema);
module.exports=User;