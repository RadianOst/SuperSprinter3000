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
   })
});

router.get('/story', function(req, res, next){
  res.render('story');
});

module.exports = router;
