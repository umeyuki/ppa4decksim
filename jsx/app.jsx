var React = require('react/addons'),
	Select = require('react-select');
var DATA = require('./data.jsx')

var App = React.createClass({
    getInitialState: function() {
    return {
      options: DATA['Members'],
      members: [],
      before_event_count: 0,
      after_event_count:  0,
    };
  },

  onLabelClick: function (data, event) {
	console.log(data);
  },
  onChange: function (value, members) {
    if ( members.length < 6 ) {
      this.setState({ options: DATA['Members']});
    } else {
      this.setState({ options: [] });
    }
    this.setState({ members: members } );
    before=0;
    after=0;
    for (var i=0; i < members.length; i++) {
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
      var cx = React.addons.classSet;
      return <div>
	  <label>{this.props.label}</label>
	  <Select
	onOptionLabelClick={this.onLabelClick}
	value={this.state.members}
	multi={true}
	placeholder="イベキャラを選択してください"
	options={this.state.options}
    onChange={this.onChange} />
      <div className="event-count">
        <span className="pure-badge">前イベ {this.state.before_event_count}</span>
        <span className="pure-badge">後イベ {this.state.after_event_count}</span>
      </div>
      <table className="pure-table pure-table-bordered result">
          <thead>
              <tr>
                  <th>イベキャラ</th>
                  <th>イベント</th>
                  <th>得意練習</th>
                  <th>コツ</th>
                  <th>金特・オリ変</th>
              </tr>
          </thead>
      {this.state.members.map(function(member) {
          var eventTdClass = cx({
              "before": member.event_order === 0,
              "after":  member.event_order === 1
          });
          return <tbody>
          <tr>
          <td>
            <span className="pure-badge">{member.label}</span>
          </td>
          <td className={eventTdClass}>
            <span className="pure-badge">{member.event_order === 0 ? "前イベ" : "後イベ"}</span>
          </td>
		  <td>
            <span className="pure-badge">{member.traning}</span>
          </td>
		  <td>
            <ul>
              {member.skills.map(function(skill) {
                return <li><span className="pure-badge">{skill}</span></li>;
              })}
            </ul>
          </td>
		  <td>
            <ul>
              {member.special_skills.map(function(special) {
                return <li><span className="pure-badge">{special}</span></li>;
              })}
            </ul>
          </td>
          </tr>
        </tbody>
       }, this)}
      </table>
      <table className="pure-table pure-table-bordered result">
          <thead>
              <tr>
                  <th>コンボ</th>
                  <th>効果</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>hogehoge</td>
                  <td>hogehoge</td>
              </tr>
          </tbody>
      </table>
    </div>
  }
});


React.render(
	<App label="イベキャラを選択してください:" />
,
  document.getElementById('app')
);
