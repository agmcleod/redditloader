var express = require('express');
var router = express.Router();
var subreddits = require('../../constants/subreddits');
var redditAPI = require('../reddit_api');

router.get('/', function (req, res) {
  res.json(subreddits);
});

router.get('/:subreddit', function (req, res, next) {
  var subredditName = req.params.subreddit;
  redditAPI.getSubredditPosts(subredditName).then(function (data) {
    res.json(data);
  }).catch(function (err) {
    next(err);
  });
});

module.exports = router;