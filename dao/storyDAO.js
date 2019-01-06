var Story = require("../models/story");
const { Pool } = require('pg');

let storyDAO = {};

const SELECT_ALL_QUERY = "SELECT * FROM stories";
const SELECY_BY_ID_QUERY = "SELECT * FROM stories WHERE id=$1";
const INSERT_QUERY = "INSERT INTO stories (title, story, criteria, value, estimations, status) " +
                     "VALUES ($1, $2, $3, $4, $5, 'planning')";
const UPDATE_QUERY = "UPDATE stories SET title=$2, story=$3, criteria=$4, value=$5, estimations=$6, status=$7 " +
                     "WHERE id=$1";

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
          client.release();
          resolve(res.rows);
        })
        .catch(e => {
          client.release();
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
          client.release();
          resolve(res.rows[0]);
        })
        .catch(e => {
          client.release();
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
          client.release();
          resolve();
        })
        .catch(e => {
          client.release();
          console.error(e.stack);
          reject();
        })
    })
  });
}

storyDAO.updateStory = function(id, story){
  return new Promise(function(resolve, reject){
    storyDAO.pool.connect((err, client, done) => {
      if (err) throw err
      client.query(UPDATE_QUERY, [id, story.title, story.story, story.criteria, story.value, story.estimations, story.status])
        .then(res => {
          client.release();
          resolve();
        })
        .catch(e => {
          client.release();
          console.error(e.stack);
          reject();
        })
    })
  });
}

module.exports = storyDAO;
