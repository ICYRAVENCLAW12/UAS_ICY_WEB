const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const account = require('../models/account');
const Followme = require('../models/followme');
const Trends = require('../models/trending');
const post = require('../models/post')

router.get("/", async (req, res, next) => {
    //cek user session
    if(!req.session.user){
        res.redirect('/auth/login');
    } else try{
        const Name = req.session.name;
        const Email = req.session.user;
        const pic = await account.find({email: Email});
        const m  = await Movie.find();
        const data2 = await account.find({name: Name});
        const flow = await Followme.find();
        const tren = await Trends.find();
        console.log(m)
        res.render("pages/home", {movie: m, picture: pic, followme: flow, trend: tren, account: pic});
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

router.get('/explore', async (req, res) => {
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    const explor = await post.find().limit(15);
    console.log(explor)
    res.render('pages/explore', {account: pic, posting: explor})
})

router.get('/explore-page', async (req, res) => {
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    const explor = await post.find()
    console.log(explor)
    res.render('pages/explore-pages', {account: pic, posting: explor})
})

router.get('/message', async (req, res) => {
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    res.render('pages/message', {account: pic})
})

router.get('/profile_page',async (req, res) => {
    console.log(req.session.name)
    const Name = req.session.name;
    console.log(Name)
    const Username = req.session.user;
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    const data2 = await account.find({name: Name});
    const data1 = await Movie.find({username : Name});
    const data = await Followme.find();
    const data3 = await Trends.find();
    console.log(data2)
    res.render('pages/profile_pages', {movie: data1, userr: data2, followme: data, trend: data3, account: pic})
})

router.get('/followme', async (req, res) => {
    const data = await Followme.find();
    const data2 = await Trends.find();
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    res.render('pages/followme', {followme: data, trend: data2, account: pic})
})

router.get('/trending', async (req, res) => {
    const data = await Followme.find();
    const data2 = await Trends.find();
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    res.render('pages/trending', {followme: data, trend: data2, account: pic})
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
router.get('/change9', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/9.jpg"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/9.jpg"})
    req.session.ImagePath ='../../Assets/9.jpg';
    res.redirect('/profile_page')
})
router.get('/change10', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/10.jpg"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/10.jpg"})
    req.session.ImagePath ='../../Assets/10.jpg';
    res.redirect('/profile_page')
})
router.get('/change11', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/11.jpg"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/11.jpg"})
    req.session.ImagePath ='../../Assets/11.jpg';
    res.redirect('/profile_page')
})
router.get('/change12', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/12.jpg"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/12.jpg"})
    req.session.ImagePath ='../../Assets/12.jpg';
    res.redirect('/profile_page')
})
router.get('/change13', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/13.jpg"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/13.jpg"})
    req.session.ImagePath ='../../Assets/13.jpg';
    res.redirect('/profile_page')
})
router.get('/change14', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/14.jpg"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/14.jpg"})
    req.session.ImagePath ='../../Assets/14.jpg';
    res.redirect('/profile_page')
})
router.get('/change15', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/15.jpg"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/15.jpg"})
    req.session.ImagePath ='../../Assets/15.jpg';
    res.redirect('/profile_page')
})
router.get('/change16', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/16.jpg"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/16.jpg"})
    req.session.ImagePath ='../../Assets/16.jpg';
    res.redirect('/profile_page')
})
router.get('/change17', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/17.png"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/17.png"})
    req.session.ImagePath ='../../Assets/17.jpg';
    res.redirect('/profile_page')
})
router.get('/change18', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/18.jpg"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/18.jpg"})
    req.session.ImagePath ='../../Assets/18.jpg';
    res.redirect('/profile_page')
})
router.get('/change19', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/19.jpg"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/19.jpg"})
    req.session.ImagePath ='../../Assets/19.jpg';
    res.redirect('/profile_page')
})
router.get('/change20', async (req, res) => {
    const Email = req.session.user;
    console.log(Email)
    await account.updateOne ({email: Email}, {ImagePath: "../../Assets/20.jpg"})
    await Movie.updateMany ({Email: Email}, {ImagePath: "../../Assets/20.jpg"})
    req.session.ImagePath ='../../Assets/20.jpg';
    res.redirect('/profile_page')
})

router.get('/modal',(req, res) => {
    res.render('pages/MODAL')
})

router.get('/notification_panel', async (req, res) => {
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    res.render('pages/notif', {account: pic})
})

router.get('/setting',async (req, res) => {
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    res.render('pages/setting', {account: pic})
})

router.get('/profile_setting', async (req, res) => {
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    res.render('pages/profile_settings', {account: pic})
})

router.get('/changepass', async (req, res) => {
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    const data = req.session.user;
    console.log(data);
    res.render('pages/change', {account: pic})
})

router.get('/helpandabout',async (req, res) => {
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    res.render('pages/helpandabout', {account: pic})
})

router.get('/contactus', async (req, res) => {
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    res.render('pages/Contactus', {account: pic})
})

router.get('/upload', async (req, res) => {
    const Email = req.session.user;
    const pic = await account.find({email: Email});
    res.render('pages/make', {account: pic})
}) 


router.get('/logout', (req,res) => {
    //hapus session
    req.session.destroy();

    //redirect ke login
    res.redirect('/auth/login');
})

module.exports = router;