const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
  render() {
    return (
      <div> This is a placeholder for {'<'}IssueFilter{'>'} </div>
    );
  }
}


const issues = [
  {
    id: 1,
    status: 'Open',
    owner: 'Ravan',
    created: new Date('2016-08-15'),
    effort: 5,
    completionDate: undefined,
    title: 'Error in Console when clicking add',
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
];

class IssueRow extends React.Component {
  render() {
    const borderedStyle = {
      border: '1px solid silver',
      padding: 4,
    };
    return (
      <tr>
        <td style={borderedStyle}>{this.props.issue_id}</td>
        <td style={borderedStyle}>{this.props.children}</td>
      </tr>
    );
  }
}

IssueRow.propTypes = {
  issue_id: React.PropTypes.number.isRequired,
};

IssueRow.defaultProps = {
  children: '-- no title --',
};

class IssueTable extends React.Component {
  render() {
    const issueRows = 
    const borderedStyle = {
      border: '1px solid silver',
      padding: 6,
    };

    return (
      <table style={{borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th style={borderedStyle}> Id </th>
            <th style={borderedStyle}> Title </th>
          </tr>
        </thead>
        <tbody>
        
          <IssueRow issue_id={3}>
            some error ticket
          </IssueRow>

          <IssueRow issue_id={2}>
            Missing bottom <b>border</b> on panel
          </IssueRow>

          <IssueRow issue_id={2}>
          </IssueRow>

        </tbody>
      </table>
    );
  }
}

class IssueAdd extends React.Component {
  render() {
    return (
      <div> This is a placeholder for {'<'}IssueAdd{'>'} </div>
    );
  }
}

class Borderwrap extends React.Component {
  render() {
    const borderedStyle = {
      border: '1px solid red',
      padding: 6,
    };
    return (
      <div style={borderedStyle}>
        {this.props.children}
      </div>
    );
  }
}

class IssueList extends React.Component {
  render() { 
    return(
      <div>
        <Borderwrap>
          <h1 style={{margin: 5}}> Issue Tracker </h1>
          <h2 style={{margin: 5}}> test </h2>
        </Borderwrap>

        <Borderwrap>
          <IssueFilter />
        </Borderwrap>
        <hr />

        <IssueTable issues={issues}/>
        <hr />

        <IssueAdd />
      </div>
    ); 
  }
}
ReactDOM.render(<IssueList />, contentNode);
