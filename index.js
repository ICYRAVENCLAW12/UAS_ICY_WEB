const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const Movie = require('./models/Movie');
const account = require('./models/account');
const User = require('./models/account')
const app = express();


// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

const session = require('express-session');

app.use(session({
  secret: '123asd21asg45',
}))


mongoose.connect(('mongodb+srv://ICY:ICY@cluster0.c2p5x.mongodb.net/icyweb?retryWrites=true&w=majority')
, (err,res) => {
    if(err){
        console.error(err);
    }
    else{
        console.log('Database terhubung')
    }
})


// MIDDLEWARE
app.set("view engine", "ejs");
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(express.static('public')); 

// ROUTES
const homeRoute = require('./routes/home');
app.use('/', homeRoute)
const authRoute = require('./routes/auth');
app.use('/auth', authRoute);

app.post('/changepw', async (req, res, next)=>{
  const Username= req.session.user; // di session
  const Pass = req .session.pass; //password di session
  const new_password = req.body.newpassword; //new password
  const confirm_new_password = req.body.confirmnewpassword; //new password confirm
  const old_password = req.body.oldpassword; //old password
  console.log(old_password)
  const data = await User.find({"email" : Username})
        if (old_password == Pass && confirm_new_password == new_password) { //cek if old password = password in account and the new password is same with confirm new password
            console.log(account.password);
            console.log(User); //checking sake
            console.log(new_password); //checking sake
            console.log(confirm_new_password); //checking sake
            await account.updateOne ({email: Username}, {password: new_password}) //updating new
            console.log(User)
            res.render('pages/setting')
            req.session.pass = new_password;
            } else {
                  res.render('pages/change', {
                  companyName : 'SALAH',
                  error : 'wrong old password or the password you type diffrent. '
              })
          }
  })

app.post('/changepic', async (req, res, next) => {
  const Image = req.body;
  saveImageUser(movie, img);
  try{
    const newMovie = await movie.save();
    console.log(newMovie);  
    res.redirect('/')  ;
  }catch (err){
    console.log(err);    
  }
})

app.post('/add', async ( req, res, next)=>{
  const {name, type, img} = req.body;
  const username = req.session.name;
  const Email = req.session.user;
  const ImagePath = req.session.ImagePath;
  const movie = new Movie({
    name,
    type,
    username,
    Email,
    ImagePath
  });
  
  const moviei = await Movie.find();
  console.log(moviei)

  // SETTING IMAGE AND IMAGE TYPES
  saveImage(movie, img);
  try{
    const newMovie = await movie.save();
    console.log(newMovie);  
    res.redirect('/')  ;
  }catch (err){
    console.log(err);    
  }
});

app.post('/VERIF', (req, res) => { //email verif forget password
  const email = req.body.email; // take email input from body
  const math = Math.floor(Math.random() * 999999) + 111111; // generate 6 random number for verification
  console.log(math) // checking sake
  console.log(email) // checking sake
  req.session.math = math; //save the random number to a session
  req.session.email = email; // save the email to a session

  let transporter = nodemailer.createTransport({ // nodemailer function 
    service: 'gmail',
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
        user: 'icyravenclaw12@gmail.com',        // Email Dev
        pass: 'kzfrhrxjoqkogpsv'     // Pass Dev
    },
    tls: {
      rejectUnauthorized: false
    }
    });

    // Step 2
    let mailOptions = { // email body
        from: 'icyravenclaw12@gmail.com', 
        to: email,
        subject: 'your otp verification code is here',
        text: ' Hey ' + email + '! We heard that you lost your ICY password. Sorry about that! But don’t worry! You can use the following otp code to reset your password: ' + math + 'thank you'
    };

    // Step 3
    transporter.sendMail(mailOptions, function(err, data) { // sending data to email
        if (err) {
            console.log('GAGAL Terkirim, ' + err);
        } else {
            res.render('pages/forgetverif__beneran')
            console.log('BERHASIL Terkirim!!!')
            console.log(req.session.math) // checking sake
        }
    });
  })

  app.post('/verification', (req, res) => { // verification for the forget password
    console.log(req.session.math) // checking sake
    const math = req.session.math; // const math = session math
    const verif = req.body.random; // take the random number from body
    if ( math == verif ) { // check if the input == verif
      res.render('pages/change_otp') // direct to change password page
      req.session.destroy; // destroy all session 
    } else {
      console.log('your a failure i send you to jesus') // checking sake
    }
  })


app.post('/profile_settings', async (req, res, next)=>{
  const Username= req.session.user; //email di session
  const Pass = req .session.pass; //password di session
  const old_name = req.session.name; //nama lama di session
  const Name = req.body.name; //nama baru
  const BIO = req.session.bio;
  const number1 = req.session.number; //nomor yang lama di session
  const Bio = req.body.Bio; //bio
  const Email = req.body.email; //email
  const Number = req.body.number; //no telp

  await User.findOne({"email" : User}, async (err, User)=> { //mencari database mana yang akan diganti
        if (Name != account.name) { //cek jika nama baru dan lama tidak sama
          console.log(old_name); //checking sake
          console.log(User); //checking sake
          console.log(Name); //checking sake
          console.log(Bio); //checking sake
          console.log(Email); //checking sake
          console.log(Number); //checking sake

          if (Name) { //if name is not null or undifine then
            await account.updateOne ({email: Username}, {name:Name}) // find target and update it
            await Movie.updateMany ({username: old_name}, {username: Name}) // update the post name too so syncronus
            req.session.name = Name; // create new session
            console.log('ini' + req.session.name) // checking sake
          } else { // if name is null or undifine then
            console.log('tidak berubah') // not doing any changes
            req.session.name = Username; // set the session normal
          }
          if (Email) { //if name is not null or undifine then
            await account.updateOne ({email: Username}, {email:Email}) // find target and update it
            req.session.user = Email; // create new session
            console.log('ini' + req.session.name) // checking sake
          } else { // if name is null or undifine then
            console.log('tidak berubah')// not doing any changes
            req.session.user = old_name; // set the session normal
          }
          if (Number) { //if name is not null or undifine then
            await account.updateOne ({email: Username}, {number:Number}) // find target and update it
            req.session.number = Number; // create new session
            console.log('ini' + req.session.name) // checking sake
          } else { // if name is null or undifine then 
            console.log('tidak berubah')// not doing any changes
            req.session.number = number1; // set the session normal
          }
          console.log('ini' + User) // checking sake
          res.render('pages/setting') // direct to setting homepage
          } else { // if the name is same
                res.render('pages/profile_settings', {
                companyName : 'SALAH', //you cannot do it awkkwkww
                error : 'wrong old password. '
            })
        }
      })
})

  app.post('/otp_password', async (req, res, next)=>{ //change password command
    const update_email = req.session.email; // reqire email from session
    const update_password = req.body.password_update; //take the new pass from body
    const update_password_confirm = req.body.password_update_confirm; //confirm the new pass from body
    console.log(update_email)
    console.log(update_password)
    console.log(update_password_confirm)
    await User.findOne({"email" : User}, async (err, User)=> { // find and update
          if (update_password == update_password_confirm) {
            await account.updateOne ({email: update_email}, {password: update_password})
            console.log(User)
            res.redirect('/')
            req.session.destroy
            } else {
                  res.render('pages/change_otp', {
                  companyName : 'SALAH',
                  error : 'diffrent password. '
              })
          }
        })
  })


function saveImage(movie, imgEncoded) {
  // CHECKING FOR IMAGE IS ALREADY ENCODED OR NOT
  if (imgEncoded == null) return;

  // ENCODING IMAGE BY JSON PARSE
  // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
  const img = JSON.parse(imgEncoded);
  console.log( "JSON parse: "+ img);
  
  // CHECKING FOR JSON ENCODED IMAGE NOT NULL 
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  // AND HAVE VALID IMAGE TYPES WITH IMAGE MIME TYPES
  if (img != null && imageMimeTypes.includes(img.type)) {

    // https://nodejs.org/api/buffer.html
    // The Buffer class in Node.js is designed to handle raw binary data. 
    // SETTING IMAGE AS BINARY DATA
    movie.img = new Buffer.from(img.data, "base64");
    movie.imgType = img.type;
  }
}

app.listen(process.env.PORT || 4000, function(){
  console.log("server is active");
});
