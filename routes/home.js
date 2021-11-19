const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const account = require('../models/account');

router.get("/", async (req, res, next) => {
    //cek user session
    if(!req.session.user){
        res.redirect('/auth/login');
    } else try{
        const Email = req.session.user;
        const pic = await account.find({email: Email});
        const m  = await Movie.find();
        console.log(m)
        res.render("pages/home", {movie: m, picture: pic});
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

router.get('/change1', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/1.jpg"});
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/1.jpg"});
    req.session.ImagePath ='../../Assets/1.jpg';
    console.log(req.session.ImagePath)
    res.redirect('/profile_page')
})
router.get('/change2', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/2.png"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/2.png"})
    req.session.ImagePath ='../../Assets/2.png';
    res.redirect('/profile_page')
})
router.get('/change3', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/3.png"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/3.png"})
    req.session.ImagePath ='../../Assets/3.png';
    res.redirect('/profile_page')
})
router.get('/change4', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/4.png"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/4.png"})
    req.session.ImagePath ='../../Assets/4.png';
    res.redirect('/profile_page')
})
router.get('/change5', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/5.jpg"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/5.jpg"})
    req.session.ImagePath ='../../Assets/5.jpg';
    res.redirect('/profile_page')
})
router.get('/change6', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/6.png"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/6.png"})
    req.session.ImagePath ='../../Assets/6.png';
    res.redirect('/profile_page')
})
router.get('/change7', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/7.png"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/7.png"})
    req.session.ImagePath ='../../Assets/7.png';
    res.redirect('/profile_page')
})
router.get('/change8', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/8.png"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/8.png"})
    req.session.ImagePath ='../../Assets/8.png';
    res.redirect('/profile_page')
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