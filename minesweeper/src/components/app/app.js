import React, {Component} from 'react';
import './app.scss';
import Music from "../music";
import weight from '../../assets/sounds/weightless.mp3';
import Sound from "../sound";
import FieldWrapper from "../field-wrapper";
import Footer from "../footer/footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMusicPlay: false,
      sound: {
        soundVolume: 1,
        isSoundPlay: false,
      }
    }
  }
  toggleSound = () => {
    const isSoundPlay = !this.state.sound.isSoundPlay;
    this.setState({sound: {
      isSoundPlay,
        soundVolume: this.state.sound.soundVolume
      }})
  }
  changeVolumeSound = (e) => {
    const newSoundVolume = parseFloat(e.target.value);
    this.setState({sound: {
      soundVolume: newSoundVolume,
        isSoundPlay: this.state.sound.isSoundPlay
      }})
  }

  openFullScreen = () => {
    document.querySelector('.field-wrapper').requestFullscreen();
  }
  render() {
    return (

      <div className='wrapper'>
        <button onClick={this.openFullScreen}>full screen</button>
        <Sound changeSoundVolume={this.changeVolumeSound} isSoundPlay={this.state.sound.isSoundPlay} toggleSound={this.toggleSound}/>
        <Music sound={weight}/>
        <FieldWrapper soundVolume={this.state.sound.soundVolume} isSoundPlay={ this.state.sound.isSoundPlay } />
        <Footer />
      </div>
    )
      ;
  }
}

export default App;
