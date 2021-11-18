const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const account = require('../models/account');

router.get("/", async (req, res, next) => {
    //cek user session
    if(!req.session.user){
        res.redirect('/auth/login');
    } else try{
        const movie  = await Movie.find();
        console.log(movie)
        res.render("pages/home", {
          movie
        });
      }catch (err){
        console.log("err: "+ err); 
      }
  });

router.get('/forgetpass', (req, res) => {
    res.render('pages/forgetpass_beneran')
})

router.get('/signup', (req, res) => {
    res.render('pages/signup')
})

router.get('/forgetverif', (req, res) => {
    res.render('pages/forgetverif__beneran')
})

router.get('/explore', (req, res) => {
    res.render('pages/explore')
})

router.get('/message',(req, res) => {
    res.render('pages/message')
})

router.get('/profile_page',async (req, res) => {
    console.log(req.session.name)
    const Name = req.session.name;
    const Username = req.session.user;
    const data2 = await account.find({name: Name});
    const data1 = await Movie.find({username : Name});
    console.log(data2)
    res.render('pages/profile_pages', {movie: data1, userr: data2})
})

router.get('/modal',(req, res) => {
    res.render('pages/MODAL')
})

router.get('/notification_panel',(req, res) => {
    res.render('pages/notif')
})

router.get('/setting',(req, res) => {
    res.render('pages/setting')
})

router.get('/profile_setting',(req, res) => {
    res.render('pages/profile_settings')
})

router.get('/changepass',(req, res) => {
    const data = req.session.user;
    console.log(data);
    res.render('pages/change')
})

router.get('/helpandabout',(req, res) => {
    res.render('pages/helpandabout')
})

router.get('/contactus',(req, res) => {
    res.render('pages/Contactus')
})

router.get('/upload',(req, res) => {
    res.render('pages/make')
})


router.get('/logout', (req,res) => {
    //hapus session
    req.session.destroy();

    //redirect ke login
    res.redirect('/auth/login');
})

module.exports = router;