const router = require('express').Router();
const { createUser, loginUser, showAll } = require('../models/users');

// router.get('/find', function(req, res){
//   res.json(routesDataTwo)
// })
router.get('/all', showAll, (req,res)=>{
  console.log('Show all users ');
  // var all = res.climbers;
  // JSON.stringify(all);
  // console.log("my climbers: ", all)
  res.json(res.climbers)
  // res.send()
})

router.get('/register', function(req, res){
  console.log("got to the registration route")
  res.render('register', {user: req.session.user})
})

router.post('/register', createUser, function(req, res){
  console.log("req.body", req.body);
  res.redirect('/')
})


router.get('/login', function(req, res){
  console.log("got to the login route")
  res.render('login', {user: req.session.user})
})

router.post('/login', loginUser, function(req, res){
  // console.log("res.user", res.user);
  // console.log("save body ", req.body)
  req.session.user = res.user;

  req.session.save(function(err){
    if(err) throw err;
    res.redirect('/');
    console.log("req session:", req.session.user)
  });
});

router.delete('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/')
  });
});


module.exports = router;
