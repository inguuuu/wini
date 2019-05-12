const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();


router.post('/login', isNotLoggedIn, (req, res, next) => {
    console.log('여기까지 찍히는가');
    passport.authenticate('local', (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        req.flash('loginError', info.message);
        return res.redirect('/');

      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        console.log('정상적으로 로그인됨@@');
        return res.redirect('/');
      });

    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.

  });

  router.get('/logout',isLoggedIn,(req,res)=>{
      req.logout();
      req.session.destroy();
      res.redirect('/');
      console.log('정상적으로 로그아웃됨');


    });

module.exports = router;
