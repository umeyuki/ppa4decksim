/** @jsx React.DOM */

var React = require('react'),
	Select = require('react-select');
var DATA = require('./data.jsx');




App = React.createClass({
  getInitialState: function() {
  	return {
      items: DATA['Members']
    };
  },

  render: function() {
    return <div>
      <div>
        {this.state.items.map(function(item) {
          return <div className="item">{item.roma}</div>;
        })}
      </div>
    </div>;
  }
});

React.render(<App/>, document.body);
