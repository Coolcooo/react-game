import React from 'react';
import './cell.scss';

class Cell extends React.Component {

  render() {
    const colors = ['blue','green', 'red', 'yellow', 'pink', 'black'];
    const style = {
      color: colors[this.props.cellValue - 1]
    }
    return (
      <div className="cell-wrapper" datapos={this.props.position}>
        <div className="cell cell_hidden"></div>
        <div className="cell__value" style={style} >{this.props.cellValue}</div>
      </div>
    )
  }

}

export default Cell;
