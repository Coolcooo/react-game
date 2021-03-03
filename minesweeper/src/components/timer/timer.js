import React, {Component} from 'react';
import './timer.scss'

export default class Timer extends Component {
  constructor() {
    super();
    this.state = {
      time: 0,
    }
  }
  start = new Date();

  setTimer = async () => {
    const timeNow = Math.floor((new Date() - this.start) / 1000);
    await this.setState({ time: timeNow});
    setTimeout(this.setTimer,1000);
}
componentDidMount() {
    this.setTimer();
}

  render() {

    return <div className='timer'>
      {this.state.time}
    </div>
  }
}
