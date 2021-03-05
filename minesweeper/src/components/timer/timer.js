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


componentDidMount() {
  this.props.startTime();
}


  render() {

    return <div className='timer'>
      {this.props.time}
    </div>
  }
}
