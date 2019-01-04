var express = require('express');
var StoryDAO = require("../dao/storyDAO");

var router = express.Router();
const dao = new StoryDAO();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { storiesArr: dao.getAllStories() });
});

module.exports = router;
