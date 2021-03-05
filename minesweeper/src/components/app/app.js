import React, {Component} from 'react';
import './app.scss';
import Music from "../music";
import weight from '../../assets/sounds/weightless.mp3';
import Sound from "../sound";
import FieldWrapper from "../field-wrapper";
import Footer from "../footer/footer";
import ScoreField from "../score-field/score-field";
import Instruction from "../instruction";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMusicPlay: false,
      sound: {
        soundVolume: 1,
        isSoundPlay: false,
      },
      bestResults: [],
      time: 0,
      restart: false
    }
  }

  toggleSound = () => {
    const isSoundPlay = !this.state.sound.isSoundPlay;
    this.setState({
      sound: {
        isSoundPlay,
        soundVolume: this.state.sound.soundVolume
      }
    })
  }

  changeVolumeSound = (e) => {
    const newSoundVolume = parseFloat(e.target.value);
    this.setState({
      sound: {
        soundVolume: newSoundVolume,
        isSoundPlay: this.state.sound.isSoundPlay
      },
    })
  }
  addBestResult = (e) => {
    const prevBestResults = this.state.bestResults;
    if (prevBestResults.length < 5) {
      const bestResults = [...prevBestResults, e].sort((a, b) => a - b);
      this.setState({bestResults});
    } else if (prevBestResults[prevBestResults.length - 1] > e) {
      const bestResults = [...prevBestResults.slice(0, prevBestResults.length - 1), e].sort((a, b) => a - b);
      this.setState({bestResults});
    }
  }
  componentDidMount() {
    document.body.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.code === 'ArrowDown') {
        const sound = document.querySelector('#sound');
        sound.value = parseFloat(sound.value) - 0.01;
        sound.dispatchEvent(new Event('input', {bubbles: true}));
      } else if (e.ctrlKey && e.code === 'ArrowUp') {
        const sound = document.querySelector('#sound');
        sound.value = parseFloat(sound.value) + 0.01;
        sound.dispatchEvent(new Event('input', {bubbles: true}));
      } else if (e.code === 'ArrowDown') {
        const music = document.querySelector('#music');
        music.value = parseFloat(music.value) - 0.01;
        music.dispatchEvent(new Event('input', {bubbles: true}));
      } else if (e.code === 'ArrowUp') {
        const music = document.querySelector('#music');
        music.value = parseFloat(music.value) + 0.01;
        music.dispatchEvent(new Event('input', {bubbles: true}));
      }
    });
    document.body.addEventListener('keyup', (e) => {
      if (e.code === 'KeyF') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      }
    });
  }


  render() {
    return (

      <div className='wrapper'>
        <div className='helpers-wrapper'>
          <div className='volume-wrapper'>
            <Sound changeSoundVolume={this.changeVolumeSound} isSoundPlay={this.state.sound.isSoundPlay}
                    toggleSound={this.toggleSound}/>
            <Music sound={weight}/>
          </div>
          <Instruction />
        </div>
        <FieldWrapper
          addBestResult={this.addBestResult}
          soundVolume={this.state.sound.soundVolume}
          isSoundPlay={this.state.sound.isSoundPlay}/>
        <ScoreField bestResults={this.state.bestResults}/>
        <Footer/>
      </div>
    )
      ;
  }
}

export default App;
