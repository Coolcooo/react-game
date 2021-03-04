import React, {Component} from 'react';

export default class Sound extends Component {
  render() {
    return (
      <div>
        <label htmlFor="sound">Sound</label>
        <input onInput={this.props.changeSoundVolume} id='sound' type="range" min='0' max='1' step='0.01'/>
        <button className='material-icons' onClick={this.props.toggleSound}>{this.props.isSoundPlay ? 'pause': 'play_arrow'}</button>
      </div>
    )
  }
}
