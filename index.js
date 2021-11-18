const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

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
  const Username= req.session.user;
  const Pass = req .session.pass;
  const new_password = req.body.newpassword;
  const confirm_new_password = req.body.confirmnewpassword;
  const old_password = req.body.oldpassword;

  await User.findOne({"email" : User}, async (err, User)=> {
        if (old_password == account.password) {
          console.log(User);
          console.log(new_password);
          console.log(confirm_new_password);
          await account.updateOne ({email: Username}, {password: new_password})
          console.log(User)
          res.render('pages/setting')
          } else {
                res.render('pages/change', {
                companyName : 'SALAH',
                error : 'wrong old password. '
            })
        }
      })
})

app.post('/add', async ( req, res, next)=>{
  const {name, type, img} = req.body;
  const username = req.session.name;
  const movie = new Movie({
    name,
    type,
    username
  });

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