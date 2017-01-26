import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import CodeMirror from 'react-codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/xml/xml';
// import 'codemirror/mode/markdown/markdown';

var Codemirror = require('react-codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

var defaults = {
  markdown: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
  javascript: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
};

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      code: defaults.markdown,
      readOnly: false,
      mode: 'markdown',
    };
    this.updateCode = this.updateCode.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.toggleReadOnly = this.toggleReadOnly.bind(this)
    this.interact = this.interact.bind(this)
    this.compile = this.compile.bind(this)
  }
  updateCode (newCode) {
    this.setState({
      code: newCode
    });
  }
  changeMode (e) {
    var mode = e.target.value;
    this.setState({
      mode: mode,
      code: defaults[mode]
    });
  }
  toggleReadOnly () {
    this.setState({
      readOnly: !this.state.readOnly
    }, () => this.refs.editor.focus());
  }
  interact (cm) {
    console.log(cm.getValue());
  }
  compile () {
    console.log(this.refs.editor.props.value);
  }
  render() {
    var options = {
      lineNumbers: true,
      readOnly: this.state.readOnly,
      mode: this.state.mode
    };
    return (
      <div>
        <Codemirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} interact={this.interact} />
        <div style={{ marginTop: 10 }}>
          <select onChange={this.changeMode} value={this.state.mode}>
            <option value="markdown">Markdown</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button onClick={this.toggleReadOnly}>Toggle read-only mode (currently {this.state.readOnly ? 'on' : 'off'})</button>
          <button onClick={this.compile}>log to console</button>
        </div>
      </div>
    );
  }
}

export default App;
