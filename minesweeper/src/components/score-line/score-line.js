import React, {Component} from 'react';
import './score-line.scss'

export default class ScoreLine extends Component {
  render() {
    return <div className='score-line'>{this.props.num + 1}. {this.props.text}s.</div>;
  }
}
