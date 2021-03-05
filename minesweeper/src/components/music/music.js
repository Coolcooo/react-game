import React, {Component} from 'react';

export default class Music extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
    }
  }

  music = new Audio(this.props.sound);

  changeLevelOfVolume = (e) => {
    this.music.volume = parseFloat(e.target.value);
  }

  playMusic = () => {
    this.setState({isPlay: !this.state.isPlay}, () => {
      if (this.state.isPlay) {
        this.music.autoplay = true;
        this.music.play();
        this.music.loop = true;
      } else {
        this.music.pause();
      }
    })
  }



  render() {
    return (
      <div>
        <label htmlFor="music">Music</label>
        <input id='music' onInput={this.changeLevelOfVolume} type="range" className="volume" max='1' min='0'
               step='0.01'/>
        <button className='material-icons'
                onClick={this.playMusic}>{this.state.isPlay ? 'pause' : 'play_arrow'}</button>
      </div>

    );
  }
}
