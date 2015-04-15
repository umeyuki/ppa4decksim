var React = require('react/addons'),
    Select = require('react-select');
var DATA = require('./data.jsx');
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
    this.setState( { before_event_count: before } );
    this.setState( { after_event_count: after  } );
  },
  render: function() {
    var cx = React.addons.classSet;
    return <section>
    <label>{this.props.label}</label>
    {window.parent.screen.width <= 480 ? "イベキャラ選択から抜けるにはspaceキーを押してください" : ""}
    <Select
      onOptionLabelClick={this.onLabelClick}
      value={this.state.members}
      multi={true}
      noResultsText="イベキャラ選択が完了しました"
      placeholder="イベキャラを選択してください"
      options={this.state.options}
      onChange={this.onChange} />
    <section className="event-count">
        <span className="pure-button before">
            前イベ {this.state.before_event_count}
        </span>
        <span className="pure-button after">
            後イベ {this.state.after_event_count}
        </span>
				<div>
						<a href="http://pawapurolabo.tumblr.com/post/115213099093">前イベ・後イベとは?</a>
				</div>
    </section>
    {this.state.members.map(function(member) {
      var memberClass  = cx({
        "member": true,
        "pure-badge": true,
        "male": member.type === 0 ,
        "female": member.type === 1,
        "girlfriend": member.type === 2,
        "girlfriend-player": member.type === 3
      });

      var eventClass = cx({
        "pure-badge": true,
        "before": member.event_order === 0,
        "after":  member.event_order === 1
      });
      var traningClass = cx({
        "pure-badge": member.traning,
        "traning": true
      });
      var skillClass = cx({
        "pure-badge": member.skills.length > 0,
        "skill": true
      });
      return <div className="pure-g result">
      <div className="pure-u-1-1">
      <span className={memberClass}>{member.label}</span>
      <span className={eventClass}>
        {member.event_order === 0 ? "前イベ" : "後イベ"}
      </span>
      <span className={traningClass}>
        {member.traning}
      </span>
      <ul>
      {member.skills.map(function(skill) {
        return <li><span className={skillClass}>{skill}</span></li>;
      })}
      </ul>
      <ul>
      {member.special_skills.map(function(special) {
        return <li><span className="pure-badge special-skill">{special}</span></li>;
      })}
      </ul>
      </div>
      </div>
     }, this)}
      <hr/>
      <section className="pure-g hint">
        <div className="pure-u-1-1">
          <div>
            <span className="pure-badge male">男性</span>
            <span className="pure-badge female">女性</span>
            <span className="pure-badge girlfriend">彼女</span>
            <span className="pure-badge girlfriend-player">選手兼彼女</span>
          </div>
          <div>
            <span className="pure-badge before">前イベ</span>
            <span className="pure-badge after">後イベ</span>
            <span className="pure-badge traning">得意練習</span>
            <span className="pure-badge skill">練習コツ</span>
            <span className="pure-badge special-skill">金特・オリジナル変化球</span>
          </div>
        </div>
      </section>
    </section>
  }
});

React.render(
  <App/>,
  document.getElementById('app')
);
