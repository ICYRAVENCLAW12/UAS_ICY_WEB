const e = require('express');
const express = require('express');
const session = require('express-session');
const { data } = require('jquery');
const account = require('../models/account');
const User = require('../models/account')
const router = express.Router();

router.get('/login', (req,res) => {
    if(req.session.user){
        res.redirect('/');
        console.log(session.user);
    } else {
    res.render('pages/login', {
        companyName: 'UNTAR'
    });
    }
});

router.get('/forgetverif', (res, req) => {
    res.render('pages/forgetverif__beneran')
})

router.get('/forgetpass', (req, res) => {
    res.render('pages/forgetpass_beneran')
})

router.post('/login', async(req,res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
  
        const data = await User.find({email: username});
  
        data.forEach((account) => {
            if (username == account.email) {
             if (password == account.password) {
                console.log(data)
                req.session.user = username;
                req.session.pass = password;
                req.session.name = account.name;
                req.session.bio = account.bio;
                req.session.number = account.number;
                req.session.ImagePath = account.ImagePath;
                
                console.log(req.session.user)
                console.log(req.session.pass)
                console.log(req.session.name)
                console.log(req.session.bio)
                console.log(req.session.number)
                console.log(req.session.ImagePath)
                res.redirect('/');
            } else {
                res.render('pages/login', {
                    companyName : 'SALAH',
                    error : 'Wrong Email or Password. '
                })
            }
        }})
    } catch (error) {
        console.log('error tidak terhubung you are a failure')
    }
})


router.get('/logout', (req,res) => {
    //hapus session
    req.session.destroy();

    //redirect ke login
    res.redirect('/auth/login');
})

router.get('/signup', async (req, res) => {
    res.render('pages/signup');
})

router.post('/signup',async (req,res) =>{
    const name = req.body.name;
    const date = req.body.date;
    const sex = req.body.sex;
    const email = req.body.email;
    const number = req.body.number

    const data = await User.find();
    await data.forEach((account) => {
        if (email == account.email) {
            res.render('pages/signup' , {error: 'Email sudah terdaftar'})
        }
        })
    const password = req.body.password;
    const password_ = req.body.password_;
    if (password != password_) {
        res.render('pages/signup', {error: 'Password tidak sama!'})
    }
    else {
        const user = new User ({
            name: name,
            date: date,
            sex: sex,
            email: email,
            password: password,
            number: number,
            ImagePath: "../../Assets/2.png"
        });
        await user.save((err, res) => {
            if (err) console.error(err);
            else {
                console.log('Sign In berhasil!');
            }
        })
        req.session.isLoggedIn = true;
        res.redirect('/');
    }
})

module.exports = router;
