var Story = require("../models/story");
const { Pool } = require('pg');

let storyDAO = {};

const SELECT_ALL_QUERY = "SELECT * FROM stories";
const SELECY_BY_ID_QUERY = "SELECT * FROM stories WHERE id=$1";
const INSERT_QUERY = "INSERT INTO stories (title, story, criteria, value, estimations, status) " +
                     "VALUES ($1, $2, $3, $4, $5, 'planning')";

storyDAO.pool = new Pool({
  user: 'sprinter',
  host: 'localhost',
  database: 'supersprinter',
  password: 'sprinter',
  port: 5432
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
storyDAO.pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
})

storyDAO.getAllStories = function(){
  return new Promise(function(resolve, reject){
    storyDAO.pool.connect((err, client, done) => {
      if (err) throw err
      client.query(SELECT_ALL_QUERY)
        .then(res => {
          resolve(res.rows);
        })
        .catch(e => {
          console.error(e.stack);
          reject();
        })
    })
  });
}

storyDAO.getStory = function(id){
  return new Promise(function(resolve, reject){
    storyDAO.pool.connect((err, client, done) => {
      if (err) throw err
      client.query(SELECY_BY_ID_QUERY, [id])
        .then(res => {
          resolve(res.rows[0]);
        })
        .catch(e => {
          console.error(e.stack);
          reject();
        })
    })
  });
}

storyDAO.addStory = function(story){
  return new Promise(function(resolve, reject){
    storyDAO.pool.connect((err, client, done) => {
      if (err) throw err
      client.query(INSERT_QUERY, [story.title, story.story, story.criteria, story.value, story.estimations])
        .then(res => {
          resolve();
        })
        .catch(e => {
          console.error(e.stack);
          reject();
        })
    })
  });
}

storyDAO.updateStory = function(story){
  return undefined;
}

module.exports = storyDAO;
