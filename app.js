// load up the express framework
const express = require('express');

// reads a json file as a mock database
const data = require('./data/users.json');

// create an instance of express to serve our end points
const app = express();

// handle json helper
app.use(express.json());

// default route
app.get('/', (req, res) => {
  res.send('welcome to the development api-server');
});

// /users return users from 'data'
app.get('/users', (req, res) => { // define route (express doc)
  const { query: { offset = 0, limit = 2 } } = req; // deconstructing request object to get query, defaulting to offset 0, limit 2
  const result = data.slice(Number(offset), Number(limit) + Number(offset)); // using .slice method to slice the array
  res.json(result); // returning result to client
});

// /users/:id Returns a user by id
app.get('/users/:id', (req, res) => { // defining the route (express doc)
  const { params: { id } } = req; // deconstructing the request object to get params (:id)
  /* 
  const result = data
    .filter(item => item.id === Number(id)) // filtering 'data' objects by id
    .map(item => { // mapping trough objects in array
      delete item.password; // remove 'password' property
      return item; // return item without 'password' property
    });
  */

  const notFoundError = { error: 'not_found' };

  const user = data.find(user => user.id === Number(id)) // filtering 'data' objects by id
  if (user) {
    delete user.password; // remove 'password' property
  }
  
  res.json(user || notFoundError); // returning result to client

});


// launch server on port 3001.
const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});
