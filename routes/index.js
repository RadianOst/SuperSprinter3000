var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { storiesArr: [
    {
      id: 0,
      title: "Mama",
      story: "Nice story",
      criteria: "none",
      value: 100,
      estimations: 1,
      status: "done"
    },
    {
      id: 1,
      title: "Papa",
      story: "Well story",
      criteria: "some",
      value: 100,
      estimations: 1,
      status: "done"
    }
  ] });
});

module.exports = router;
