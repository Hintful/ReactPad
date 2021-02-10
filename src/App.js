import logo from './logo.svg';
import './App.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';

const TITLE = "ReactPad";

ReactGA.initialize("G-D3Z7LQS3WW");

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      audio_url: props.url,
      key_name: props.key_name,
      key_code: props.keycode,
      keydown: false
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.mouseUpReset = this.mouseUpReset.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    document.addEventListener("keydown", this.handleKeyPress);
    document.addEventListener("keyup", this.handleKeyUp);
    document.addEventListener("mouseup", this.mouseUpReset);
    this.audio = new Audio(this.props.url);
    this.audio.load();
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    document.removeEventListener("keyup", this.handleKeyUp);
    document.removeEventListener("mouseup", this.mouseUpReset);
  }
  playSound() {
    this.audio.currentTime = 0; // allow re-play before sound ends
    const audioPromise = this.audio.play();
    
    if (audioPromise !== undefined) {
      audioPromise.then(_ => {}).catch(err => {console.info(err)});
    }
  }
  handleKeyPress(event) {
    ReactGA.event({
      category: 'ReactPad User',
      action: 'Key pressed'
    });
    if(event.keyCode === this.props.key_code) {
      this.setState( { keydown: true } );
      this.playSound();
    }
  }
  handleKeyUp(event) {
    if(event.keyCode === this.props.key_code) {
      this.setState( { keydown: false } );
    }
  }
  handleMouseDown(event) {
    this.setState( { keydown: true } );
    this.playSound();
  }
  handleMouseUp(event) {
    this.setState( { keydown: false } );
  }
  mouseUpReset(event) {
    this.setState( { keydown: false } ); // in case mouseUp occurs outside of pad pressed
  }
  render() {
    const state = "drum-pad" + (this.state.keydown ? " keydown" : "");
    return (
      <div id={this.state.audio_url} className={state} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
        {this.state.key_name}
      </div>
    )
  }
}

class ReactPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [
        "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
      ],
      names: [
        "Key 1", "Key 2", "Key 3", "Key 4", "Key 5", "Key 6", "Key 7", "Key 8", "Key 9"
      ],
      key_codes: [81, 87, 69, 65, 83, 68, 90, 88, 67],
      curKey: ""
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    document.addEventListener("keyup", this.handleKeyUp);
  }
  handleKeyPress(event) {
    for(let i = 0; i < this.state.key_codes.length; i++) {
      if(event.keyCode === this.state.key_codes[i]) {
        this.setState( { curKey: this.state.names[i] } );
      }
    }
  }
  handleKeyUp(event) {
    this.setState( { curKey: "" } ); // reset
  }
  render() {
    return (
      <div className="main">
        <div class="title">
          ReactPad
        </div>
        <div id="drum-machine">
          <div class="pad-container">
            <DrumPad key_name={"Q"} url={this.state.urls[0]} name={this.state.names[0]} key_code={this.state.key_codes[0]}/>
            <DrumPad key_name={"W"} url={this.state.urls[1]} name={this.state.names[1]} key_code={this.state.key_codes[1]}/>
            <DrumPad key_name={"E"} url={this.state.urls[2]} name={this.state.names[2]} key_code={this.state.key_codes[2]}/>
            <DrumPad key_name={"A"} url={this.state.urls[3]} name={this.state.names[3]} key_code={this.state.key_codes[3]}/>
            <DrumPad key_name={"S"} url={this.state.urls[4]} name={this.state.names[4]} key_code={this.state.key_codes[4]}/>
            <DrumPad key_name={"D"} url={this.state.urls[5]} name={this.state.names[5]} key_code={this.state.key_codes[5]}/>
            <DrumPad key_name={"Z"} url={this.state.urls[6]} name={this.state.names[6]} key_code={this.state.key_codes[6]}/>
            <DrumPad key_name={"X"} url={this.state.urls[7]} name={this.state.names[7]} key_code={this.state.key_codes[7]}/>
            <DrumPad key_name={"C"} url={this.state.urls[8]} name={this.state.names[8]} key_code={this.state.key_codes[8]}/>
          </div>
          { /* 
          <div class="display-div">
            <div id="display">
              {this.state.curKey}
            </div>
          </div> */ }
        </div>
        <div class="credit">
          Coded and designed by <u>Kurt Choi</u>
        </div>
      </div>
    ); 
  }
}

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <ReactPad />
    </div>
  );
}

export default App;
