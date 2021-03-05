import React, {Component} from 'react';
import './mine-counter.scss'

export default class MineCounter extends Component {

  render() {
    return (
      <div className='mine-counter'>{this.props.countOfFlags}</div>
    )
  }
}
