import React, { Component } from 'react';
import ScoreLine from "../score-line/score-line";
import './score-field.scss'

export default class ScoreField extends Component {
  render() {
    return (
      <div className='score-wrapper'>
        <div className='score'>Best Score</div>
        {this.props.bestResults.map((e, ind) => <ScoreLine num={ind} text={e}/>)}
      </div>
    )
  }
}
