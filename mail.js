const sgmail=require('@sendgrid/mail');
const sgMail = require('@sendgrid/mail'); 
function mail(newid){ 
    function date()
    {
        const d= new Date(); 
        const dt= d.getDate();
        const mt= d.getMonth();
        const yt= d.getYear(); 
        return dt+"/"+mt+"/"+yt;



    }
    function time()
    {
        const d= new Date(); 
        const dt= d.getHours();
        const mt= d.getMinutes();
        const yt= d.getSeconds(); 
        return dt+"/"+mt+"/"+yt;



    }

console.log(newid);
  const currdate=date();
  const currtime= time();  
    sgMail.setApiKey(process.env.API_KEY)
    const message={
        to:newid.email,
        from:'vikas0155.cse19@chitkara.edu.in',
        subject:'hello',
        text:'hello',
        html:`<h1>Hello ${newid.username}  Thanku for Login on ${currdate} at ${currtime}</h1>`
    }; 

    sgMail.send(message)
.then(()=>console.log("sentss"))
.catch((e)=>console.log(e)) 
}
module.exports=mail;