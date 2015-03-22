var React = require('react'),
	Select = require('react-select');
var DATA = require('./data.jsx')
var App = React.createClass({
  getInitialState: function() {
  	return {
      members: []
    };
  },

  onLabelClick: function (data, event) {
	console.log(data);
  },
  onChange: function (value, members) {
    this.setState({ members: members } );
  },
  render: function() {
	return <div>
	  <label>{this.props.label}</label>
	  <Select
	onOptionLabelClick={this.onLabelClick}
	value={this.state.members}
	multi={true}
	placeholder="イベキャラを選択してください"
	options={DATA['Members']}
	onChange={this.onChange} />
      {this.state.members.map(function(member) {
      return <div>
          <ul>
          <li>{member.value}</li>
          </ul>
          </div>
    }, this)}
    </div>
  }
});


React.render(
	<App label="イベキャラを選択してください:" />
,
  document.getElementById('app')
);
