var express = require('express');
const storyDAO = require("../dao/storyDAO");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { storiesArr: storyDAO.getAllStories() });
});

module.exports = router;
