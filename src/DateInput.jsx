import React, { Component } from 'react';

class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.editFormat(props.value),
      focused: false,
      valid: true,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveNewProps(newProps) {
    if (newProps.value !== this.props.value) {
      this.setState( { value: this.editFormat(newProps.value) } );
    }
  }

  onFocus() { this.setState( { focused: true } ); }

  onBlur(e) {
    const value = this.unformat(this.state.value);
    const valid = this.state.value === '' || != null;
  }

  onChange(e) {}

  displayFormat(date) {}

  editFormat(date) {}

  unformat(str) {}

  render() {
    const className = 
    const value = 
    return (
      <input 
        type="text"
        size={20}
        name={this.props.name}
        className={className}
        value={value}
        placeholder={this.state.focused ? 'yyyy-mm-dd' : null }
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
      />
    );
  }
}

DateInput.propTypes = {
  value: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  onValidityChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,

};
