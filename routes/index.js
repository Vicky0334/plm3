var express = require('express');
var router = express.Router();
const userModel=require('./users');
const passport = require('passport');
const localStrategy= require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));
  


router.get('/', function(req, res, next) {
  res.render('index');
});
function isLoggedIn(req, res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}
router.post('/register', function(req, res, next) {
const userdata =new userModel  ({
     username:req.body.username,
     email:req.body.email,
});
userModel.register(userdata,req.body.password).then(function() {
  passport.authenticate("local")(req, res, function(){
    res.redirect('/login');
  }) 
})

});



router.get('/login',(req, res,)=>{
  res.render('login');
});


router.post('/login',passport.authenticate("local",{
  successRedirect: '/feed',
  failureRedirect: '/login', 
}),function(req, res,) {});

router.get('/feed',isLoggedIn,function(req, res, next) {
 
  res.render('feed')
  });

module.exports = router;