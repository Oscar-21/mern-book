const express = require('express');
const bodyParser = require('body-parser');

// instantiate server
const app = express();

// prettify json output in curl requests
app.set('json spaces', '\t');

// static middlware to serve static files
app.use(express.static('static'));

// middleware to parse req.body json objects
app.use(bodyParser.json());

// In memory issues object
const issues = [
  {
    id: 1,
    status: 'Open',
    owner: 'Ravan',
    created: new Date('2016-08-15'),
    effort: 5,
    completionDate: undefined,
    title: 'error in console',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    created: new Date('2016-08-16'),
    effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel',
  },
  {
    id: 3,
    status: 'Assigned',
    owner: 'Eddie',
    created: new Date('2016-08-16'),
    effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel',
  },
  {
    id: 4,
    status: 'Assigned',
    owner: 'Eddie',
    created: new Date('2016-08-16'),
    effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel',
  },
];

// Routes

// get issues object
app.get('/api/issues', (req, res) => {
  const metadata = { total_count: issues.length };
  res.json( { _metadata: metadata, records: issues });
});

// add new issue object 
app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.id = issues.length + 1;
  newIssue.created = new Date();

  if (!newIssue.status)
    newIssue.status = 'New';

  issues.push(newIssue);

  res.json(newIssue);
});

// listen for requests on port 3000
app.listen(3000, function() {
  console.log('App started on port 3000');
});
