import React, {Component} from 'react';
import './field-wrapper.scss';
import Timer from "../timer";
import MineCounter from "../mine-counter/mine-counter";
import RestartSmile from "../restart-smile";
import Field from "../field";

export default class FieldWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countOfFlags: 9,
      time: 0,
      restart: false,
      isStopTime: false
    }
  }
  stopTimer;

  addFlag = (amount) => {
    const countOfFlags = this.state.countOfFlags - amount;
    this.setState({countOfFlags})
  }
  removeFlag = (amount) => {
    const countOfFlags = this.state.countOfFlags + amount;
    this.setState({countOfFlags})
  }
  setTime = () => {
    this.setState({time: this.state.time + 1});
    this.stopTimer = setTimeout(this.setTime, 1000);

  }
  stopTime = () => {
    clearTimeout(this.stopTimer);
  }

  resetTime = () => {
    this.setState({time: 0});
  }
  doRestart = () => {
    this.setState({restart: !this.state.restart},() => {
    });
  }
  render() {
    return (
      <div className="field-wrapper">
        <div className='field-wrapper__information'>
          <MineCounter
            countOfFlags={this.state.countOfFlags}

          />
          <RestartSmile doRestart={this.doRestart}/>
          <Timer
            startTime={this.setTime}
            time={this.state.time}
            setTime={this.setTime}/>
        </div>
        <Field startTime={this.setTime}
          stopTime={this.stopTime}
          doRestart={this.doRestart}
          isRestart={this.state.restart}
          resetTime={this.resetTime}
               time={this.state.time}
               addBestResult={this.props.addBestResult}
               soundVolume={this.props.soundVolume}
               isSoundPlay={this.props.isSoundPlay}
               countOfFlags={this.state.countOfFlags}
               removeFlag={this.removeFlag}
               addFlag={this.addFlag}
        />
      </div>
    );
  }
}
