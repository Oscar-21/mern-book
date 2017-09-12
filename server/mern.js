import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import 'babel-polyfill';
import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
import Issue from './issue.js';

// Hot Module Replacement
const webpack = process.env.NODE_ENV !== 'production' ? require('webpack') : null;
const webpackDevMiddleware = webpack !== null ? require('webpack-dev-middleware') : null;
const webpackHotMiddleware = webpack !== null ? require('webpack-hot-middleware') : null;
const config = webpack !== null ? require('../webpack.config') : null;

// Instantiate server instance
const app = express();

// Middleware
app.use(express.static('static'));
app.use(bodyParser.json());

// mongodb connection
let db;

// Hot module replacement
if (webpack !== null) {
  config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const bundler = webpack(config);
  app.use(webpackDevMiddleware(bundler, {
    noInfo: true,
  //  historyApiFallback: true
  }));
  app.use(webpackHotMiddleware(bundler, {
    log: console.log,
//    historyApiFallback: true
  }));
}


// Get all issues
app.get('/api/issues', (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  console.log(req.query.status);
  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);

  db.collection('issues').find(filter).toArray()
  .then(issues => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues });
  })
  .catch(error => {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});


// Get Issue to edit
app.get('/api/issues/:id', (req, res) => {
  let issueId;

  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }

  db.collection('issues').find({ _id: issueId }).limit(1)
  .next()

  .then(issue => {
    if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });
    else res.json(issue);
  })

  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});


// Create new Issue
app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = 'New';
  }
  const err = Issue.validateIssue(newIssue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  db.collection('issues').insertOne(Issue.cleanupIssue(newIssue)).then(result =>
    db.collection('issues').find({ _id: result.insertedId }).limit(1)
    .next()
  )
  .then(savedIssue => {
    res.json(savedIssue);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});


// Update Issue
app.put('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
  }

  const issue = req.body;
  delete issue._id;

  const err = Issue.validateIssue(issue);

  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  db.collection('issues').updateOne({ _id: issueId }, Issue.convertIssue(issue))
  .then(() =>
    db.collection('issues').find({ _id: issueId }).limit(1)
    .next()
  )
  .then(savedIssue => {
    res.json(savedIssue);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});


// Delete Issue
app.delete('/api/issues/:id', (req, res) => {
  let issueId;

  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }

  db.collection('issues').deleteOne({ _id: issueId })
  .then((deleteResult) => {
    if (deleteResult.result.n === 1 ) res.json({ status: 'OK' });
    else res.json({ status: 'Warning object not found' });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });

});


// Redirect any other request to root document 
app.get('*', (req, res) => {
  res.sendFile(path.resolve('static/index.html'));
});


// Connect to Database and start server
MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
  db = connection;
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});
