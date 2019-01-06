var express = require('express');
const storyDAO = require("../dao/storyDAO");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  storyDAO.getAllStories()
   .then(function(result){
     res.render('index', { storiesArr: result });
   })
   .catch(function(){
     res.render('index', { storiesArr: [] });
   });
});

router.get('/story', function(req, res, next){
  res.render('story', { story: null });
});

router.post('/story', function(req, res, next){
  storyDAO.addStory(req.body)
    .then(function(){
      res.redirect('/');
    })
    .catch(function(){
      res.render('story', { story: null });
    });
});

router.get('/story/:id', function(req, res, next){
  storyDAO.getStory(req.params.id)
    .then(function(story){
      res.render('story', { story: story });
    })
    .catch(function(){
      res.render('story', { story: null })
    });

});

module.exports = router;
