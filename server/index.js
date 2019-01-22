require('newrelic');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/index.js');
const Promise = require("bluebird");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(/(\/\d+)/, express.static(path.join(__dirname, '../public')));
/* Request Handling */



// Get current product related Items
// original endpoint: '/relatedItems/:categoryName/:id'
app.get('/api/:id', (req, res) => {
  let productId = req.url.substring(5);
  db.selectOne(productId)
  .then(recommended => {
    console.log('recd item: ',recommended)
    res.status(200).json(recommended)
  })
  // doit.then(()=>{console.log("poop")})
  //   .then((relatedItems) => {
  //     console.log('get-endpoint',relateditems)
  //     Products.findAll({
  //       where: {
  //         [db.Op.not]: { categoryName: req.params.categoryName },
  //       },
  //       order: db.literal('rand()'),
  //       limit: 8,
  //     }).then((otherRelatedItems) => {
  //       console.log('relateditems: ', relatedItems);
  //       res.status(200).json([...relatedItems/*, ...otherRelatedItems*/]);
  //     });
  //   })
  //   .catch((error) => {
  //     console.log('There was an error getting products from the DB: ', error);
  //     res.sendStatus(404);
  //   });
});





const port = 9000; // Change Me for Proxy!!

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});




// // Get current Product
// app.get('/currentProduct/:id', (req, res) => {
//   Products.findByPk(req.params.id)
//     .then((product) => {
//       res.status(200).json(product);
//     })
//     .catch((error) => {
//       console.log('There was an error getting curr Product from the DB: ', error);
//       res.sendStatus(404);
//     });
// });

// // Get current product accessories
// app.get('/items/:categoryName', (req, res) => {
//   Accessories.findAll({
//     where: {
//       categoryName: req.params.categoryName,
//     },
//     order: db.literal('rand()'),
//     limit: 5,
//   })
//     .then((results) => {
//       res.status(200).json(results);
//     })
//     .catch((error) => {
//       console.log('There was an error getting accessories from the DB: ', error);
//       res.sendStatus(404);
//     });
// });

// // Get past viewed items from db

// app.get('/ViewHistory', (req, res) => {
//   ViewHistory.findAll({
//     limit: 12,
//     order: [['updatedAt', 'DESC']],
//   })
//     .then((pastItems) => {
//       res.status(200).json(pastItems);
//     })
//     .catch((error) => {
//       console.log('There was an error getting pastItems from the DB: ', error);
//       res.sendStatus(404);
//     });
// });

// // save currentProduct to viewHistory db

// app.post('/SaveProduct', (req, res) => {
//   ViewHistory.findOrCreate({
//     where: {
//       id: req.body.productID,
//     },
//     defaults: {
//       name: req.body.name,
//       productID: req.body.productID,
//       price: req.body.price,
//       imageURL: req.body.imageURL,
//       categoryName: req.body.categoryName,
//     },
//   })
//     .spread(() => {
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       console.log('There was an error posting pastItems to the DB: ', error);
//       res.sendStatus(501);
//     });
// });
