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
      combo: [],
      before_event_count: 0,
      after_event_count: 0,
      members: random(DATA['Members'], 5)
    };
  },
  onChange: function (value, members) {
    this.setState({ members: members } );
	console.log('value:' + value);
	console.log('members:' + members);
  },
  addItem: function() {
    this.setState({
      items: [{text: this.state.newText, time: new Date(), key: Math.random()}].concat(this.state.items),
      newText: ""
    })
  },
  render: function() {
	return <div>
	  <label>{this.props.label}</label>
	  <Select
	value={this.state.members}
	multi={true}
	placeholder="イベキャラを選択してください"
	options={DATA['Members']}
	onChange={this.onChange} />
      {this.state.members.map(function(member) {
      return <div>
          <ul>
          <li>{member.label}</li>
          <li>{member.event}</li>
            {member.skills.map(function(skill) {
               return <li>{skill}</li>;
             })}
            {member.special_skills.map(function(special_skill) {
               return <li>{special_skill}</li>;
             })}
          </ul>
          </div>
    }, this)}
    </div>
  }
});

React.render(<App/>, document.body);
