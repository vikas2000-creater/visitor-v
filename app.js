if(process.env.NODE_ENV!=='production')
{
	require('dotenv').config();
}
const express=require('express'); 

const sgmail=require('@sendgrid/mail');
const mail = require('./mail.js'); 
const mongoose= require('mongoose');
const app= express();   
const User= require('./models/user.js');
const session= require('express-session'); 
const flash=require('connect-flash'); 
const passport= require('passport');
const LocalStrategy=require('passport-local');
const path= require('path');
app.set('views',path.join(__dirname,'views')); 
app.set('view engine','ejs'); 
app.use(express.urlencoded({extended:true})); 
app.use(session({
  secret: 'visitorapp',
  resave: false,
  saveUninitialized: true,
  
}))   

app.use(flash()); 
app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(" db connected");
}) 
.catch((err)=>{
    console.log(err);
})    
app.use((req,res,next)=>{
	res.locals.currentUser=req.user; 
         next();
})
const authroutes= require('./routes/authroutes.js');
app.use(authroutes);
app.get('/',(req,res)=>{  
	res.render('index',{message:req.flash('success')});
})  
app.get('/signup',(req,res)=>{
	res.render('../views/signup',{message:req.flash('error')});
})
app.get('/home/login',(req,res)=>{ 
        console.log(req.user);
	res.render('login');
})  
app.get('/firstpage/:username',async (req,res)=>{ 
	console.log(req.params);

	const newid= await User.findOne(req.params); 
	console.log(newid);  

	mail(newid); 
	res.render('show',{message:req.flash('success'),newid});
}) 

app.listen(process.env.PORT || 2323,(req,res)=>{
	console.log("app listen at port 3000");

})