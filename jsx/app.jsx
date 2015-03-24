var React = require('react'),
	Select = require('react-select');
var DATA = require('./data.jsx')
var App = React.createClass({
  getInitialState: function() {
  	return {
      members: [],
      before_event_count: 0,
      after_event_count:  0
    };
  },

  onLabelClick: function (data, event) {
	console.log(data);
  },
  onChange: function (value, members) {
    this.setState({ members: members } );
    before=0;
    after=0;
    console.log(members.length);
    for (var i=0; i < members.length; i++) {
      console.log(members[i]);
      if ( members[i].event_order == 0 ) {
        before++;
      } else {
        after++;
      }
    }
    this.setState( { before_event_count: before } )
    this.setState( { after_event_count: after  } )
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
        return <section className="pure-g">
        <div className="pure-u-1-4"><span className="pure-badge">{member.label}</span></div>
        <div className="pure-u-1-4">{member.label}</div>
        <div className="pure-u-1-4">{member.label}</div>
        <div className="pure-u-1-4">{member.label}</div>
        </section>
    }, this)}
        {this.state.before_event_count}
        {this.state.after_event_count}
    </div>
  }
});


React.render(
	<App label="イベキャラを選択してください:" />
,
  document.getElementById('app')
);
