var React = require('react'),
    Select = require('react-select');
var DATA = require('./data.jsx');
var ClassNames = require('classnames');

var Filter = React.createClass({
  render: function() {
    return <section>
    <div>
    <input type="checkbox" value="" checked="checked"/> 男
    <input type="checkbox" value="" checked="checked"/> 女
    <input type="checkbox" value="" checked="checked"/> 彼女
    </div>
    <div>
    <Select
    option={[{ label:'label', value:'value'}]}
    placeholder="特殊能力で絞り込む"
    />
    </div>
    <div>
    <Select
    option={[{ label:'label', value:'value'}]}
    placeholder="得意練習で絞り込む"
    />
    </div>
    <div>
    試合経験点
    <input type="radio" value="" checked="checked"/> あり
    <input type="radio" value="" /> なし
    </div>
    <div>
    <input type="checkbox" value="" checked="checked"/>前イベ
    <input type="checkbox" value="" checked="checked"/>後イベ
    </div>
    </section>;
  }
});

var Character = React.createClass({
  propTypes: {
    character: React.PropTypes.shape({
//      id: React.PropTypes.number.isRequired,
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired,
      traning: React.PropTypes.string,
      skills: React.PropTypes.array,
      specialSkills: React.PropTypes.array,
      type: React.PropTypes.number.isRequired,
      matchBonus: React.PropTypes.array
    }),
    index:  React.PropTypes.number.isRequired,
    options: React.PropTypes.array.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    searchable: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  getDefaultProps: function() {
    return {
      searchable: true
    };
  },
  onChange: function(value, values) {
    this.props.onChange(this.props.index, values);
  },
  render: function() {
    return <div>
    <Select
       options={this.props.options}
       searchable={this.props.searchable}
       placeholder={this.props.placeholder}
       onChange={this.onChange}
    />

    </div>;
  }
});

var Characters = React.createClass({
  propTypes: {
    defaultCharacters: React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      defaultCharacters: DATA['Characters']
    };
  },
  filter: function(args) {
    console.log(args);
    return this.props.defaultCharacters;;
  },
  getInitialState: function() {
    characters = [];
    characters = this.props.defaultCharacters;
    return {
      selectableCharacters: characters,
      hoge: 1
    };
  },
  changeCharacter: function(index, values) {
    hash = {};
    hash['character'+index] = values;
    this.setState(hash);
  },
  render: function() {
    number = 1;
    return <div>
    <Filter />
    <Character
    options={this.filter(this.state.hoge)}
    placeholder='1人目のイベキャラを選択して下さい'
    onChange={this.changeCharacter}
    index={number}
    />
    {this.state.character1}
    </div>
  }
});


/* var Filter = React.createClass({
   propTypes:  {
   searchable: true
   },
   getInitialState: function() {
   return {
   boy:           true,
   girl:          true,
   girlFriend:    true,
   beforeEvent:   true,
   afterEvent:    true,

   }
   },
   onChange: function() {

   },
   render: function() {
   return <div id="filter">
   <h3>絞り込む</h3>
   <ul>
   <li>
   <input className="pure-checkbox" type="checkbox" value={this.state.onChange} />男性
   <input className="pure-checkbox" type="checkbox" value={this.state.onChange}/>女性
   <input className="pure-checkbox" type="checkbox" value={this.state.onChange}/>彼女
   </li>
   <li>
   <input className="pure-checkbox" type="checkbox"/>前イベ
   <input className="pure-checkbox" type="checkbox"/>後イベ
   </li>
   <li>
   特殊能力
   <Select options={this.props.options} value='one'  searchable={this.props.searchable} />
   </li>
   <li>
   金特 オリジナル変化球
   <Select options={this.props.options} value='one'  searchable={this.props.searchable} />
   </li>
   <li>
   得意練習
   <Select options={this.props.options} value='one'  searchable={this.props.searchable} />
   </li>
   </ul>
   </div>
   }

   });

   var App = React.createClass({
   getInitialState: function() {
   return {
   options: DATA['Characters'],
   members: [],
   combos: [],
   before_event_count: 0,
   after_event_count:  0,
   match_bonus: 0
   };
   },
   onLabelClick: function (data, event) {
   console.log(data);
   },
   onChange: function (value, members) {
   exists = {};

   if ( members.length < 6 ) {
   this.setState({ options: DATA['Characters']});
   } else {
   this.setState({ options: [] });
   }
   this.setState({ members: members } );
   before=0;
   after=0;
   match_bonus = 0;
   member_values = [];
   for (var i=0; i < members.length; i++) {
   member_values.push(members[i]['value']);
   if ( members[i].event_order == 0 ) {
   before++;
   } else {
   after++;
   }
   if ( members[i].match_bonus ) {
   match_bonus = match_bonus + 10;
   }
   }
   this.setState( { before_event_count: before } );
   this.setState( { after_event_count: after  } );
   this.setState( { match_bonus: match_bonus } );
   combos = [];
   for (var i=0; i < DATA['Combos'].length; i++) {
   combo = DATA['Combos'][i];
   combo_members = Object.keys(combo['members']);
   compare = [];
   for (var j=0; j < combo_members.length; j++) {
   index =  member_values.indexOf(combo_members[j])
   if ( index != -1 ) {
   compare.push(member_values[index]);
   }
   }
   if ( combo_members.toString() == compare.toString() ) {
   combos.push(combo);
   }
   }
   this.setState({ combos: combos } );
   },
   render: function() {
   return <section className="container">
   <Filter />
   <label>{this.props.label}</label>
   <Select
   onOptionLabelClick={this.onLabelClick}
   value={this.state.members}
   multi={true}
   noResultsText=""
   placeholder="イベキャラを選択してください"
   options={this.state.options}
   onChange={this.onChange} />
   <section className="combo">
   { this.state.combos.length > 0 ? <h3 className="headline">コンボ発生</h3> : '' }
   {this.state.combos.map(function(combo) {
   return <p className="pure-alert pure-alert-error" >{combo.name}</p>;
   })}
   </section>
   <section className="option">
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
   <section className="option">
   <span className="pure-button match-bonus">
   試合経験点ボーナス { this.state.match_bonus } %
   </span>
   </section>
   <section className="event-character">
   { this.state.members.length > 0  ? <h3 className="headline">イベントデッキ</h3> : '' }
   {this.state.members.map(function(member) {
   var memberClass = ClassNames(
   'memberClass', 'pure-badge',
   {
   "male": member.type === 0 ,
   "female": member.type === 1,
   "girlfriend": member.type === 2,
   "girlfriend-player": member.type === 3
   }
   );
   var eventClass = ClassNames(
   'pure-badge',
   {
   "before": member.event_order === 0,
   "after":  member.event_order === 1
   }
   );
   var traningClass = ClassNames(
   "traning",
   {
   "pure-badge": member.traning,
   }
   );
   var matchBonusClass = ClassNames(
   "match-bonus",
   {
   "pure-badge": member.match_bonus,
   }
   );

   var skillClass = ClassNames("skill" ,{
   "pure-badge": member.skills.length > 0,
   });
   return <div className="pure-g result">
   <div className="pure-u-1-1">
   <span className={memberClass}>{member.label}</span>
   <span className={eventClass}>
   {member.event_order === 0 ? "前イベ" : "後イベ"}
   </span>
   <span className={matchBonusClass}>
   {member.match_bonus ? '試合経験点10%' : ''}
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
   </section>
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
   }); */

React.render(
  <Characters/>,
  document.getElementById('app')
);
