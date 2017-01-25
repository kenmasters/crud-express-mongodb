const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient,
			assert = require('assert');
const app = express();

// Connection URL
var url = 'mongodb://localhost:27017/star-wars-quotes';
var db = null;

// Use connect method to connect to the Server 
MongoClient.connect(url, (err, database) => {
	assert.equal(null, err);
  // if (err) throw err
  console.log('Connected successfully to server.');
  db = database;
});


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', './views');
app.set('view engine', 'ejs');


// Route
app.get('/', (req, res) => {
	var cursor = db.collection('quotes').find().toArray(function(err, results) {
	  // console.log(results)
	  // send HTML file populated with quotes here
		// res.sendFile(__dirname + '/index.html');
		res.render('index', 
			{
				'quotes': results
			});
	})
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) throw err
  	res.redirect('/');
  })
})

app.put('/quotes', (req, res) => {
	db.collection('quotes')
	  .findOneAndUpdate({name: 'Yoda'}, {
	    $set: {
	      name: req.body.name,
	      quote: req.body.quote
	    }
	  }, {
	    sort: {_id: -1},
	    upsert: true
	  }, (err, result) => {
	    if (err) return res.send(err)
	    res.send(result)
	  })
});

app.delete('/quotes', (req, res) => {
  db.collection('quotes')
  	.findOneAndDelete(
    {
  		name: req.body.name
		},
    (err, result) => {
		  if (err) return res.send(500, err)
		  res.send(result)
		}
  )
})



app.listen(3000, function() {
	console.log('Listening on 3000...');
});
