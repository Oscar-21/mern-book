import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, withRouter } from 'react-router';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

const App = (props) => (
  <div className="header">
    <h1> Issue Tracker </h1>

    <div className="container-fluid">
      {props.children}
    </div>

    <div className="footer">
      Full source code available at this <a href="https://github.com/Oscar-21/mern-book.git">GitHub Repo</a>.
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

const RoutedApp = () => (
  <Router history={browserHistory}>

    <Redirect from="/" to="/issues" />

    <Route path="/" component={App}>
      <Route path="/issues" component={withRouter(IssueList)} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </Route>

  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}

