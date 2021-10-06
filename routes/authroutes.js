const express= require('express');
const router= express.Router();  
//app.use(express.urlencoded({extended:true})); 
const flash=require('connect-flash');
const User= require('../models/user.js');  
const passport= require('passport'); 
const mailout= require('../mailout.js');

router.post('/register',async (req,res)=>{  
try{  
	const  {username, email,num, password}= req.body;

	const user = new User({
		username,
		email,
		num
	}) 
	  await User.register(user,password);  
	 req.flash('success','You Signup successfully!!! Please Login to continue');
	 res.redirect('/'); 
	}
	catch(e)
	{
		req.flash('error',e.message);
		res.redirect('/signup');
	}
}) 
router.get('/error',(req,res)=>{
	res.render('error.ejs',{message:req.flash('error')});
})  
router.post('/login',passport.authenticate('local',
{
 failureRedirect:'/login',
 failureFlash:true
}),(req,res)=>{  
	req.flash('success',"you are successfully Log In!!!");
	console.log(req.user);
  res.redirect(`/firstpage/${req.user.username}`);
});
router.get('/login',(req,res)=>{
	res.render('login',{message:req.flash('success')});
}) 
router.get('/logout', async (req,res)=>{ 
		const newid= await User.findOne(req.user); 
	
	req.logout(); 
	req.flash('success',"you are successfully Log OUT!!!");  
	
	mailout(newid);
	res.redirect('/');
})
module.exports=router;