/** @jsx React.DOM */

var React = require('react'),
	Select = require('react-select');
var DATA = require('./data.jsx');

// http://h2ham.net/javascript-random-array

function random(array, num) {
  var a = array;
  var t = [];
  var r = [];
  var l = a.length;
  var n = num < l ? num : l;
  while (n-- > 0) {
    var i = Math.random() * l | 0;
    r[n] = t[i] || a[i];
    --l;
    t[i] = t[l] || a[l];
  }
  return r;
}

var App = React.createClass({
  getInitialState: function() {
  	return {
      members: [
        { label: '橘みずき', roma: 'tachibana', value: '橘みずき', event: 'after' }
      ]
    };
  },
  onLabelClick: function (data, event) {

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
          <li>{member.label}</li>
          </ul>
          </div>
    }, this)}
    </div>
  }
});

React.render(<App/>, document.getElementById('app'));
