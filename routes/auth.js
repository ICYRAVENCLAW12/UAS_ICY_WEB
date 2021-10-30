const express = require('express');

const router = express.Router();

router.get('/login', (req,res) => {
    if(req.session.user){
        res.redirect('/');
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

router.post('/login', (req,res) => {
    //get user input
    const username = req.body.username;
    const password = req.body.password;

    //check username and password
    if(username === 'admin@a' && password === 'admin'){
        // record user session
        req.session.user = 'admin';
        // redirect member area
        res.redirect('/');
    } else{
        res.render('pages/login', { 
            companyName : 'SALAH',
            error : 'Wrong username or password.' })
    }
})

router.get('/logout', (req,res) => {
    //hapus session
    req.session.destroy();

    //redirect ke login
    res.redirect('/auth/login');
})

module.exports = router;