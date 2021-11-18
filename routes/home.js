const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get("/", async (req, res, next) => {
    //cek user session
    if(!req.session.user){
        res.redirect('/auth/login');
    } else try{
        const movie  = await Movie.find();
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

router.get('/profile_page',(req, res) => {
    res.render('pages/profile_pages')
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
    const userdata = req.session.user;
    const pw = req.session.pass;
    console.log(userdata);
    console.log(pw);
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