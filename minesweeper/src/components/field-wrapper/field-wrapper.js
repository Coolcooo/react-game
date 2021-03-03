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
      countOfFlags: 9
    }
  }
  addFlag = () => {
    const countOfFlags = this.state.countOfFlags - 1;
    this.setState({ countOfFlags })
  }
  removeFlag = () => {
    const countOfFlags = this.state.countOfFlags + 1;
    this.setState({ countOfFlags })
  }
  render() {
    return (
      <div className="field-wrapper">
        <div className='field-wrapper__information'>
          <MineCounter
            countOfFlags={this.state.countOfFlags}

          />
          <RestartSmile/>
          <Timer/>
        </div>
        <Field soundVolume={this.props.soundVolume}
               isSoundPlay={ this.props.isSoundPlay }
               countOfFlags={this.state.countOfFlags}
               removeFlag={this.removeFlag}
               addFlag={this.addFlag}
        />
      </div>
    );
  }
}
