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
  const movie = new Movie({
    name,
    type,
    username
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

app.post('/VERIF', (req, res) => {
  const email = req.body.email;
  const math = Math.floor(Math.random() * 999999) + 111111;
  console.log(math)
  console.log(email)
  req.session.math = math;
  req.session.email = email;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'icyravenclaw12@gmail.com',        // Email Dev
        pass: 'ICYravenCLAW_12'     // Pass Dev
    }
    });

    // Step 2
    let mailOptions = {
        from: 'icyravenclaw12@gmail.com',
        to: email,
        subject: 'your otp verification code is here mothefucker ',
        text: 'your otp code is as below ' + math
    };

    // Step 3
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log('GAGAL Terkirim, ' + err);
        } else {
            res.render('pages/forgetverif__beneran')
            console.log('BERHASIL Terkirim!!!')
            console.log(req.session.math)
        }
    });
  })

  app.post('/verification', (req, res) => {
    console.log(req.session.math)
    const math = req.session.math;
    const verif = req.body.random;
    if ( math == verif ) {
      res.render('pages/change_otp')
      req.session.destroy;
    } else {
      console.log('your a failure i send you to jesus')
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

  await User.findOne({"email" : User}, async (err, User)=> {
        if (Name != account.name) {
          console.log(old_name);
          console.log(User);
          console.log(Name);
          console.log(Bio);
          console.log(Email);
          console.log(Number);

          if (Name) {
            await account.updateOne ({email: Username}, {name:Name})
            await Movie.updateMany ({username: old_name}, {username: Name})
            req.session.name = Name;
            console.log('ini' + req.session.name)
          } else {
            console.log('tidak berubah')
            req.session.name = Username;
          }
          if (Email) {
            await account.updateOne ({email: Username}, {email:Email})
            req.session.user = Email;
            console.log('ini' + req.session.name)
          } else {
            console.log('tidak berubah')
            req.session.user = old_name;
          }
          if (Number) {
            await account.updateOne ({email: Username}, {number:Number})
            req.session.number = Number;
            console.log('ini' + req.session.name)
          } else {
            console.log('tidak berubah')
            req.session.number = number1;
          }
          
          console.log('ini' + User)
          res.render('pages/setting')
          } else {
                res.render('pages/profile_settings', {
                companyName : 'SALAH',
                error : 'wrong old password. '
            })
        }
      })
})

  app.post('/otp_password', async (req, res, next)=>{
    const update_email = req.session.email;
    const update_password = req.body.password_update;
    const update_password_confirm = req.body.password_update_confirm;
    console.log(update_email)
    console.log(update_password)
    console.log(update_password_confirm)
    await User.findOne({"email" : User}, async (err, User)=> {
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

app.listen('4000', () => {
  console.log('Server is active');
});