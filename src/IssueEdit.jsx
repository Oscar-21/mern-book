import React, { Component } from 'react';
import { Link } from 'react-router';

class IssueEdit extends Component {
  render() {
    return (
      <div> 
        <p>Placeholder for editing issue {this.props.params.id}.</p>
        <Link to="/issues"> Back to issue list </Link>
      </div>
    );
  }
}
export default IssueEdit;

IssueEdit.propTypes = {
  params: React.PropTypes.object.isRequired,
};
